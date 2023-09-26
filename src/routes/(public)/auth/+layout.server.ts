import type { LayoutServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import loginSchema from "$lib/server/schemas/login";

export const load: LayoutServerLoad = async () => {
    const loginForm = await superValidate(loginSchema);

    return { loginForm };
};
