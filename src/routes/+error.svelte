<script lang="ts">
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Ошибка</title>
</svelte:head>

<h1 class="text-stone-900 p-3">Ошибка {$page.status}</h1>