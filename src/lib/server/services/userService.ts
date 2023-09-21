import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "$lib/server/db";
import type { User } from "$lib/types";
import type { UserEntity } from "$lib/server/entities";
import { JWT_SECRET } from "$env/static/private";

const usersHash = "users";

export async function createUser(user: User, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const userEntity: UserEntity = {
        username: user.username,
        role: user.role,
        passwordHash
    };

    await db.hset(usersHash, user.username, JSON.stringify(userEntity));
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

export function verifyPassword(passwordHash: string, password: string) {
    return bcrypt.compare(password, passwordHash);
}

export function signUser(user: User): string {
    return jwt.sign({ user: JSON.stringify(user) }, JWT_SECRET);
}

export function verifyUser(token: string): User | null {
    try {
        const result = jwt.verify(token, JWT_SECRET) as { user: string };

        return JSON.parse(result.user) as User;
    } catch (e) {
        return null;
    }
}
