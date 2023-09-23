import type { Actions } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import loginSchema from "$lib/server/schemas/login";
import { fail, redirect } from "@sveltejs/kit";
import { createUser, userExists } from "$lib/server/services/userService";

export const actions = {
    default: async event => {
        const form = await superValidate(event.request, loginSchema);
        if (!form.valid) {
            return fail(400, { form });
        }

        const { username, password } = form.data;

        if (await userExists(username)) {
            return message(form, "Пользователь с таким логином уже зарегистрирован");
        }

        await createUser({ username, role: "USER" }, password);

        throw redirect(303, "/auth/login");
    }
} satisfies Actions;