<script lang="ts">
    import type { PageData } from "./$types";

    import dayjs from "dayjs";

    export let data: PageData;
</script>

{#if !data.orders?.length}
    <h1>У вас нет заказов</h1>
{:else}
    <h1>Ваши заказы</h1>

    <ul>
        {#each data.orders as order}
            <li>{dayjs(order.date).format("MMMM D, YYYY")}</li>
        {/each}
    </ul>
{/if}

<a href="/orders/create">Создать заказ</a>
