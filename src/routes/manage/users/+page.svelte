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

{#if !organizers.length}
    <h1>Нет организаторов</h1>
{:else}
    <h1>Организаторы</h1>

    <ul>
        {#each organizers as organizer}
            <li>
                <form method="post" use:enhance>
                    <h2>{organizer.username}</h2>

                    <input
                        type="hidden"
                        name="username"
                        value={organizer.username}
                        {...$constraints.username}
                    />
                    <input type="hidden" name="action" value="demote" />

                    {#if $form.username === organizer.username && $message}
                        <span>{$message}</span>
                    {/if}

                    <input type="submit" value="Понизить" />
                </form>
            </li>
        {/each}
    </ul>
{/if}

{#if !users.length}
    <h1>Нет обычных пользователей</h1>
{:else}
    <h1>Обычные пользователи</h1>

    <ul>
        {#each users as user}
            <li>
                <form method="post" use:enhance>
                    <h2>{user.username}</h2>

                    <input
                        type="hidden"
                        name="username"
                        value={user.username}
                        {...$constraints.username}
                    />
                    <input type="hidden" name="action" value="promote" />

                    {#if $form.username === user.username && $message}
                        <span>{$message}</span>
                    {/if}

                    <input type="submit" value="Повысить" />
                </form>
            </li>
        {/each}
    </ul>
{/if}
