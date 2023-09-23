<script lang="ts">
    import banket from "$lib/images/banket.jpg";
</script>

<main class="h-full grid place-items-center">
    <img
        src={banket}
        alt=""
        class="-z-10 absolute h-full w-full object-cover brightness-50"
    />

    <slot />
</main>