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

<section class="flex flex-col gap-3">
    <h1 class="text-stone-900">Меню</h1>

    <ul class="flex flex-col gap-3">
        {#each data.dishes as dish}
            <li class="flex flex-col gap-1">
                <form method="post" action="?/update" use:updateEnhance class="flex flex-col gap-1">
                    <input type="hidden" name="id" value={dish.id} />

                    <input
                        name="name"
                        class="w-full"
                        value={dish.name}
                        type="text"
                        {...$updateConstraints.name}
                    />

                    <select name="type" class="w-full">
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

                    <input class="btn-black w-full" type="submit" value="Сохранить" />
                </form>

                <form method="post" action="?/delete" use:deleteEnhance>
                    <input type="hidden" name="id" value={dish.id} />
                    <input class="btn-black w-full" type="submit" value="Удалить" />
                </form>
            </li>
        {/each}
    </ul>

    <form method="post" action="?/create" use:kitEnhance>
        <input type="submit" value="Создать блюдо" class="btn-black w-full" />
    </form>
</section>
