<script lang="ts">
    import type { PageData } from "./$types";
    import type { User } from "$lib/types";
    import { superForm } from "sveltekit-superforms/client";

    export let data: PageData;

    const { form, constraints, enhance, message } = superForm(data.form);

    const [organizers, users] = data.users.reduce(
        (acc, u) =>
            u.role === "ORGANIZER"
                ? [[...acc[0], u], acc[1]]
                : u.role === "USER"
                ? [acc[0], [...acc[1], u]]
                : acc,
        [[], []] as User[][]
    );
</script>

<section>
    <div>
        <h2 class="text-stone-900">Организаторы:</h2>

        {#if organizers.length}
            <ul class="flex flex-col gap-3">
                {#each organizers as organizer}
                    <li>
                        <form method="post" class="flex items-center justify-between gap-1" use:enhance>
                            <h3 class="text-stone-900">{organizer.username}</h3>

                            <input
                                type="hidden"
                                name="username"
                                value={organizer.username}
                                {...$constraints.username}
                            />
                            <input type="hidden" name="action" value="demote" />

                            {#if $form.username === organizer.username && $message}
                                <span class="form-error">{$message}</span>
                            {/if}

                            <input class="btn-black" type="submit" value="Понизить" />
                        </form>
                    </li>
                {/each}
            </ul>
        {:else}
            <h3 class="text-stone-900">Нет организаторов</h3>
        {/if}
    </div>

    <div>
        <h2 class="text-stone-900">Пользователи:</h2>

        {#if users.length}
            <ul class="flex flex-col gap-3">
                {#each users as user}
                    <li>
                        <form method="post" use:enhance class="flex items-center justify-between gap-1">
                            <h3 class="text-stone-900">{user.username}</h3>

                            <input
                                type="hidden"
                                name="username"
                                value={user.username}
                                {...$constraints.username}
                            />
                            <input type="hidden" name="action" value="promote" />

                            {#if $form.username === user.username && $message}
                                <span class="form-error">{$message}</span>
                            {/if}

                            <input class="btn-black" type="submit" value="Повысить" />
                        </form>
                    </li>
                {/each}
            </ul>
        {:else}
            <h3 class="text-stone-900">Нет обычных пользователей</h3>
        {/if}
    </div>
</section>
