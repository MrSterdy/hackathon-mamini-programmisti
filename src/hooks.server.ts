import type { Handle } from "@sveltejs/kit";
import { AUTH_TOKEN_COOKIE_NAME } from "$lib/consts";
import { verifyUser } from "$lib/server/services/userService";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get(AUTH_TOKEN_COOKIE_NAME);

    if (token) {
        const user = verifyUser(token);

        if (user) {
            event.locals.user = user;
        }
    }

    return resolve(event);
};
