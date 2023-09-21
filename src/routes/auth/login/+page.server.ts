import { type Actions, fail, redirect } from "@sveltejs/kit";

import { getUser, signUser, verifyPassword } from "$lib/server/services/userService";
import { AUTH_TOKEN_COOKIE_NAME } from "$lib/consts";
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

        const token = signUser({ username: user.username, role: user.role });

        event.cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "strict",
            domain: event.url.hostname,
            path: "/"
        });

        throw redirect(303, "/");
    }
} satisfies Actions;
