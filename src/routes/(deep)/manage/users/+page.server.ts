import type { PageServerLoad } from "./$types";
import { type Actions, fail } from "@sveltejs/kit";
import { getAllUsers, getUser, updateUser } from "$lib/server/services/userService";
import type { User } from "$lib/types";
import { message, superValidate } from "sveltekit-superforms/server";
import updateUserSchema from "$lib/server/schemas/updateUser";

export const load: PageServerLoad = async () => {
    const users = await getAllUsers();

    const form = await superValidate(updateUserSchema);

    return {
        users: users.map(
            u => ({ username: u.username, role: u.role } satisfies User)
        ),
        form
    };
};

export const actions = {
    default: async event => {
        const form = await superValidate(event.request, updateUserSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const user = await getUser(form.data.username);
        if (!user) {
            return message(form, "Пользователь с таким логином не найден");
        }

        if (user.role === "ADMIN") {
            return message(form, "Нельзя изменять права администратора", {
                status: 403
            });
        }

        if (user.role === "ORGANIZER" && form.data.action === "promote") {
            return message(form, "Нельзя повысить организатора");
        }

        if (user.role === "USER" && form.data.action === "demote") {
            return message(form, "Нельзя понизить пользователя");
        }

        user.role = form.data.action === "promote" ? "ORGANIZER" : "USER";

        await updateUser(user);

        return { form };
    }
} satisfies Actions;
