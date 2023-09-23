import type { PageServerLoad } from "./$types";
import { getUserOrders } from "$lib/server/services/orderService";
import { getDishById } from "$lib/server/services/dishService";
import type { DetailedOrder, Dish } from "$lib/types";

export const load: PageServerLoad = async event => {
    const orders = await getUserOrders(event.locals.user!.username);

    if (orders) {
        const detailedOrders = orders.map(async order => {
            const dishPromises = order.dishes.map(dishId => getDishById(dishId));
            const dishes = await Promise.all(dishPromises);

            return { ...order, dishes: dishes as Dish[] } satisfies DetailedOrder;
        });

        return { orders: await Promise.all(detailedOrders) };
    }
};
