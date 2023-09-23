<script lang="ts">
    import banket from "$lib/images/banket.jpg";
</script>

<main class="h-full flex flex-col">
    <img src={banket} class="w-full h-1/6 object-cover brightness-50" alt="" />

    <article class="grow p-3">
        <slot />
    </article>
</main>
