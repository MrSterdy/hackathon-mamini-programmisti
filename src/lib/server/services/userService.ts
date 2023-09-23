import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "$lib/server/db";
import type { User } from "$lib/types";
import type { UserEntity } from "$lib/server/entities";
import { JWT_REFRESH_TOKEN_SECRET } from "$env/static/private";
import * as crypto from "crypto";

const usersHash = "users";
const userSecretsHash = "userSecrets";

export async function createUser(user: User, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const userEntity: UserEntity = {
        username: user.username,
        role: user.role,
        passwordHash
    };

    await db.hset(usersHash, user.username, JSON.stringify(userEntity));
}

export async function getAllUsers() {
    const rawEntries = await db.hgetall(usersHash);

    return Object.values(rawEntries).map(
        rawValue => JSON.parse(rawValue) as UserEntity
    );
}

export async function updateUser(user: UserEntity) {
    const pipeline = db.pipeline();

    pipeline.hset(usersHash, user.username, JSON.stringify(user));
    pipeline.hset(userSecretsHash, user.username, crypto.randomBytes(16).toString("hex"));

    await pipeline.exec();
}

export async function userExists(username: string) {
    return (await db.hexists(usersHash, username)) === 1;
}

export async function getUser(username: string): Promise<UserEntity | null> {
    const rawResult = await db.hget(usersHash, username);
    if (!rawResult) {
        return null;
    }

    return JSON.parse(rawResult) as UserEntity;
}

export function getUserSecret(username: string) {
    return db.hget(userSecretsHash, username);
}

export async function setUserSecret(username: string, secret: string) {
    await db.hset(userSecretsHash, username, secret);
}

export function verifyPassword(passwordHash: string, password: string) {
    return bcrypt.compare(password, passwordHash);
}

export function signUser(user: User): {
    accessToken: string;
    accessTokenSecret: string;
    refreshToken: string;
} {
    const accessTokenSecret = crypto.randomBytes(16).toString("hex");
    const accessToken = jwt.sign({ user: JSON.stringify(user) }, accessTokenSecret, {
        expiresIn: "1d"
    });
    const refreshToken = jwt.sign({ user: JSON.stringify(user) }, JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });

    return { accessToken, accessTokenSecret, refreshToken };
}
export function verifyUser(accessToken: string, secret: string): User | null;
export function verifyUser(refreshToken: string): User | null;
export function verifyUser(
    accessOrRefreshToken: string,
    secret?: string
): User | null {
    try {
        const result = jwt.verify(
            accessOrRefreshToken,
            secret ?? JWT_REFRESH_TOKEN_SECRET
        ) as { user: string };

        return JSON.parse(result.user) as User;
    } catch (e) {
        return null;
    }
}
