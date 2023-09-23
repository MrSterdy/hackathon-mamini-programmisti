import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import loginSchema from "$lib/server/schemas/login";

export const load: LayoutServerLoad = async event => {
    if (event.locals.user) {
        throw redirect(303, "/");
    }

    const loginForm = await superValidate(loginSchema);

    return { loginForm };
};
