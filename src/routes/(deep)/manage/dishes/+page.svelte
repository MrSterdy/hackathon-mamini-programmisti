<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import { dishTypes } from "$lib/consts";
    import { enhance as kitEnhance } from "$app/forms";

    export let data: PageData;

    const {
        form: updateForm,
        constraints: updateConstraints,
        message: updateMessage,
        enhance: updateEnhance
    } = superForm(data.updateDishForm);

    const {
        enhance: deleteEnhance
    } = superForm(data.deleteDishForm);
</script>

<h1>Меню</h1>

<ul>
    {#each data.dishes as dish}
        <li>
            <form method="post" action="?/update" use:updateEnhance>
                <input type="hidden" name="id" value={dish.id} />

                <input
                    name="name"
                    value={dish.name}
                    type="text"
                    {...$updateConstraints.name}
                />
                <input
                    name="description"
                    value={dish.description}
                    type="text"
                    {...$updateConstraints.description}
                />

                <select name="type">
                    {#each Object.entries(dishTypes) as dishTypeEntry}
                        <option
                            value={dishTypeEntry[0]}
                            selected={dishTypeEntry[0] === dish.type}
                            >{dishTypeEntry[1]}</option>
                    {/each}
                </select>

                {#if $updateForm.id === dish.id && $updateMessage}
                    <span>{$updateMessage}</span>
                {/if}

                <input type="submit" value="Сохранить" />
            </form>

            <form method="post" action="?/delete" use:deleteEnhance>
                <input type="hidden" name="id" value={dish.id} />
                <input type="submit" value="Удалить" />
            </form>
        </li>
    {/each}
</ul>

<form method="post" action="?/create" use:kitEnhance>
    <input type="submit" value="Создать блюдо" />
</form>
