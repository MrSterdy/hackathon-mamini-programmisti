import dayjs from "dayjs";
import "dayjs/locale/ru";

import type { Handle } from "@sveltejs/kit";
import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME,
    AUTH_REFRESH_TOKEN_COOKIE_NAME,
    AUTH_USERNAME_COOKIE_NAME
} from "$lib/consts";
import {
    createUser,
    getUser,
    getUserSecret,
    setUserSecret,
    signUser,
    verifyUser
} from "$lib/server/services/userService";
import type { User } from "$lib/types";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get(AUTH_ACCESS_TOKEN_COOKIE_NAME);
    const refreshToken = event.cookies.get(AUTH_REFRESH_TOKEN_COOKIE_NAME);
    const username = event.cookies.get(AUTH_USERNAME_COOKIE_NAME);

    if (!username) {
        return resolve(event);
    }

    let user: User | null = null;
    let updateTokens = false;

    tokenCheck: if (accessToken) {
        const secret = await getUserSecret(username);
        if (!secret) {
            break tokenCheck;
        }

        user = verifyUser(accessToken, secret);
        if (user || !refreshToken) {
            break tokenCheck;
        }

        user = verifyUser(refreshToken);
        if (!user) {
            break tokenCheck;
        }

        updateTokens = true;
    } else if (refreshToken) {
        user = verifyUser(refreshToken);
        if (user) {
            updateTokens = true;
        }
    }

    if (updateTokens) {
        user = await getUser(username);
        if (user) {
            const tokens = signUser(user);

            event.cookies.set(
                AUTH_ACCESS_TOKEN_COOKIE_NAME,
                tokens.accessToken,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    domain: event.url.hostname,
                    path: "/"
                }
            );

            event.cookies.set(
                AUTH_REFRESH_TOKEN_COOKIE_NAME,
                tokens.refreshToken,
                {
                    httpOnly: true,
                    sameSite: "strict",
                    domain: event.url.hostname,
                    path: "/"
                }
            );

            await setUserSecret(
                event.locals.user!.username,
                tokens.accessTokenSecret
            );
        }
    }

    if (user) {
        event.locals.user = user;
    }

    return resolve(event);
};

dayjs.locale("ru");

createUser({ username: ADMIN_USERNAME, role: "ADMIN" }, ADMIN_PASSWORD);
