<script lang="ts">
    import type { PageData } from "./$types";

    import dayjs from "dayjs";
    import { holidayTypes } from "$lib/consts";

    export let data: PageData;
</script>

<section class="flex flex-col gap-2">
    <h1 class="text-stone-900">Ваши заказы</h1>

    {#if !data.orders?.length}
        <h2 class="text-stone-900 text-2xl text-center">У вас нет заказов</h2>
    {:else}
        <ul class="flex flex-col gap-3">
            {#each data.orders as order}
                {@const dishes = order.dishes.filter(dish => dish !== null)}
                <li class="[&:not(:last-of-type)]:border-b-2 [&:not(:last-of-type)]:border-b-stone-900">
                    <h3 class="text-stone-900 text-xl">
                        На {dayjs(order.date).format("MMMM D, YYYY")}:
                    </h3>

                    <div>
                        <div>
                            <span>Мероприятие:
                                <span>{holidayTypes[order.holidayType]}</span>
                            </span>
                        </div>
                        <div>
                            <span>Бюджет: <span>{order.budget}</span> руб.</span>
                        </div>
                        <div>
                            <span>
                                Количество мест: <span>{order.people}</span>
                                чел.
                            </span>
                        </div>
                        <div>
                            {#if dishes.length}
                                <span>Блюда:
                                    <span>{dishes.map(dish => dish?.name).join(", ")}</span>
                                </span>
                            {:else}
                                <span>Нет блюд</span>
                            {/if}
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}

    <a role="button" class="btn-black text-center" href="/orders/create">
        Создать заказ
    </a>

    {#if data.user.role !== "USER"}
        <a role="button" href="/manage/dishes" class="btn-black text-center">Управление блюдами</a>

        {#if data.user.role === "ADMIN"}
            <a role="button" href="/manage/users" class="btn-black text-center">Управление организаторами</a>
        {/if}
    {/if}
</section>
