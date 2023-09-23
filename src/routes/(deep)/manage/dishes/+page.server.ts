import type { PageServerLoad } from "./$types";
import {
    createDish,
    deleteDish,
    getAllDishes,
    updateDish
} from "$lib/server/services/dishService";
import type { Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import updateDishSchema from "$lib/server/schemas/updateDish";
import deleteDishSchema from "$lib/server/schemas/deleteDish";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const dishes = await getAllDishes();

    const updateDishForm = await superValidate(updateDishSchema);
    const deleteDishForm = await superValidate(deleteDishSchema);

    return { dishes, updateDishForm, deleteDishForm };
};

export const actions = {
    update: async event => {
        const form = await superValidate(event.request, updateDishSchema);
        if (!form.valid) {
            return fail(400, { form });
        }

        await updateDish(form.data);

        return { form };
    },
    delete: async event => {
        const form = await superValidate(event.request, deleteDishSchema);
        if (!form.valid) {
            return fail(400, { form });
        }

        await deleteDish(form.data.id);

        return { form };
    },
    create: async () => {
        await createDish({
            id: "",
            name: "Новое блюдо",
            description: "Описание",
            type: "meat"
        });
    }
} satisfies Actions;
