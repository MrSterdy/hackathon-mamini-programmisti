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

    function updateDish({ currentTarget }: { currentTarget: HTMLInputElement }) {
        $form.dishes = currentTarget.checked
            ? [...$form.dishes, currentTarget.value]
            : $form.dishes.filter(
                dish => dish !== currentTarget.value
            );
    }
</script>

<h1>Создать заказ</h1>

<form method="post" use:enhance>
    {#if $message}<span>{$message}</span>{/if}

    <ul>
        <li>
            <h2>Дата</h2>
            <input type="date" name="date" bind:value={$form.date} />
        </li>
        <li>
            <h2>Тип праздника</h2>
            <select bind:value={$form.holidayType} name="holidayType">
                {#each Object.entries(holidayTypes) as holidayType}
                    <option
                        selected={$form.holidayType === holidayType[0]}
                        value={holidayType[0]}>{holidayType[1]}</option
                    >
                {/each}
            </select>
        </li>
        <li>
            <h2>Кол-во людей</h2>
            <span>{$form.people}</span>
            <input
                type="range"
                name="people"
                bind:value={$form.people}
                {...$constraints.people}
            />
        </li>
        <li>
            <h2>Бюджет</h2>
            <span>{$form.budget}</span>
            <input
                type="range"
                name="budget"
                bind:value={$form.budget}
                {...$constraints.budget}
            />
        </li>
        <li>
            <h2>Тип меню</h2>

            <select bind:value={selectedDishType}>
                {#each Object.entries(dishTypes) as dishType}
                    <option
                        selected={dishType[0] === selectedDishType}
                        value={dishType[0]}>{dishType[1]}</option
                    >
                {/each}
            </select>
        </li>
        <li>
            {#if !filteredDishes.length}
                <h2>Не найдено подходящих блюд для выбранного меню</h2>
            {:else}
                <h2>Блюда</h2>

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
        </li>
    </ul>

    <input type="submit" value="Заказать" />
</form>
