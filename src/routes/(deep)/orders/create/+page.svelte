<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import { dishTypes, holidayTypes } from "$lib/consts";

    export let data: PageData;

    const { form, constraints, enhance, message } = superForm(data.form);

    let selectedDishType: keyof typeof dishTypes = "meat";

    $: filteredDishes = data.dishes.filter(
        dish => dish.type === selectedDishType
    );

    function updateDish({
        currentTarget
    }: {
        currentTarget: HTMLInputElement;
    }) {
        $form.dishes = currentTarget.checked
            ? [...$form.dishes, currentTarget.value]
            : $form.dishes.filter(dish => dish !== currentTarget.value);
    }
</script>

<form method="post" class="flex flex-col gap-2" use:enhance>
    <h1 class="text-stone-900">Создать заказ</h1>

    <div id="items" class="flex flex-col gap-3">
        <div>
            <h2 class="text-stone-900">Дата</h2>
            <input type="date" name="date" bind:value={$form.date} />
        </div>
        <div>
            <h2 class="text-stone-900">Тип праздника</h2>
            <select bind:value={$form.holidayType} name="holidayType">
                {#each Object.entries(holidayTypes) as holidayType}
                    <option
                        selected={$form.holidayType === holidayType[0]}
                        value={holidayType[0]}>{holidayType[1]}</option
                    >
                {/each}
            </select>
        </div>
        <div>
            <h2 class="text-stone-900">Кол-во людей</h2>
            <input
                type="number"
                name="people"
                bind:value={$form.people}
                {...$constraints.people}
            />
        </div>
        <div>
            <h2 class="text-stone-900">Бюджет</h2>
            <input
                type="number"
                name="budget"
                bind:value={$form.budget}
                {...$constraints.budget}
            />
        </div>
        <div>
            <h2 class="text-stone-900">Тип меню</h2>

            <select bind:value={selectedDishType}>
                {#each Object.entries(dishTypes) as dishType}
                    <option
                        selected={dishType[0] === selectedDishType}
                        value={dishType[0]}>{dishType[1]}</option
                    >
                {/each}
            </select>
        </div>
        <div>
            {#if !filteredDishes.length}
                <h2 class="text-stone-900">Не найдено подходящих блюд для выбранного меню</h2>
            {:else}
                <h2 class="text-stone-900">Блюда</h2>

                <ul>
                    {#each filteredDishes as dish}
                        <li>
                            <input
                                type="checkbox"
                                name="dishes"
                                value={dish.id}
                                checked={$form.dishes.includes(dish.id)}
                                on:change={updateDish}
                            />
                            <span>{dish.name}</span>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>

    {#if $message}<span class="form-error">{$message}</span>{/if}

    <input class="btn-black" type="submit" value="Заказать" />
    <a role="button" href="/orders" class="btn-black text-center">Назад</a>
</form>

<style lang="postcss">
    h2 {
        @apply text-xl;
    }

    #items > * {
        @apply flex flex-col gap-1;
    }
</style>
