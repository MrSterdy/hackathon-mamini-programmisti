import type { PageServerLoad } from "./$types";
import { createOrder } from "$lib/server/services/orderService";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import createOrderSchema from "$lib/server/schemas/createOrder";
import { getAllDishes } from "$lib/server/services/dishService";

export const load: PageServerLoad = async () => {
    const dishes = await getAllDishes();

    const form = await superValidate(createOrderSchema);

    return { dishes, form };
};

export const actions = {
    default: async event => {
        const form = await superValidate(event.request, createOrderSchema);
        if (!form.valid) {
            return fail(400, { form });
        }

        await createOrder({ id: "", username: event.locals.user!.username, ...form.data });

        throw redirect(303, "/orders");
    }
} satisfies Actions;
