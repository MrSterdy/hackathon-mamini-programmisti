import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = event => {
    if (event.locals.user!.role === "USER") {
        throw error(403);
    }
};
