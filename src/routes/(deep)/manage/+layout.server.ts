import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = event => {
    const role = event.locals.user?.role;

    if (!role || role === "USER") {
        throw error(403);
    }
};
