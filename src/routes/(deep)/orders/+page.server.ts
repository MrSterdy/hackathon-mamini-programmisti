import type { PageServerLoad } from "./$types";
import { getUserOrders } from "$lib/server/services/orderService";

export const load: PageServerLoad = async event => {
    const orders = await getUserOrders(event.locals.user!.username);

    return { orders };
};
