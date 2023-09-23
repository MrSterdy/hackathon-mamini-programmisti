import { type Actions, fail, redirect } from "@sveltejs/kit";

import { getUser, setUserSecret, signUser, verifyPassword } from "$lib/server/services/userService";
import { AUTH_ACCESS_TOKEN_COOKIE_NAME, AUTH_REFRESH_TOKEN_COOKIE_NAME, AUTH_USERNAME_COOKIE_NAME } from "$lib/consts";
import { message, superValidate } from "sveltekit-superforms/server";
import loginSchema from "$lib/server/schemas/login";

export const actions = {
    default: async event => {
        const form = await superValidate(event.request, loginSchema);
        if (!form.valid) {
            return fail(400, { form });
        }

        const { username, password } = form.data;

        const user = await getUser(username);
        if (!user || !(await verifyPassword(user.passwordHash, password))) {
            return message(form, "Неверный логин или пароль");
        }

        const tokens = signUser({ username: user.username, role: user.role });

        event.cookies.set(AUTH_USERNAME_COOKIE_NAME, user.username, {
            httpOnly: true,
            sameSite: "strict",
            domain: event.url.hostname,
            path: "/"
        });

        event.cookies.set(AUTH_ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
            httpOnly: true,
            sameSite: "strict",
            domain: event.url.hostname,
            path: "/"
        });

        event.cookies.set(AUTH_REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            domain: event.url.hostname,
            path: "/"
        });

        await setUserSecret(user.username, tokens.accessTokenSecret);

        throw redirect(303, "/");
    }
} satisfies Actions;
