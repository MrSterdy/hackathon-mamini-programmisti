<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";

    export let data: PageData;

    const { form, constraints, errors, enhance, message } = superForm(
        data.loginForm
    );
</script>

<form method="post" use:enhance>
    <input
        type="text"
        name="username"
        bind:value={$form.username}
        placeholder="Логин"
        {...$constraints.username}
    />
    {#if $errors.username}<span>{$errors.username[0]}</span>{/if}
    <input
        type="password"
        name="password"
        bind:value={$form.password}
        placeholder="Пароль"
        {...$constraints.password}
    />
    {#if $errors.password}<span>{$errors.password[0]}</span>{/if}

    {#if $message}<span>{$message}</span>{/if}

    <input type="submit" value="Войти" />
</form>
