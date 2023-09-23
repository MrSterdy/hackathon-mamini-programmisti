<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";

    export let data: PageData;

    const { form, constraints, errors, enhance, message } = superForm(
        data.loginForm
    );
</script>

<form method="post" use:enhance class="flex flex-col gap-3 items-center">
    <h1>Вход</h1>

    <section class="flex flex-col gap-2 items-center">
        <input
            type="text"
            name="username"
            bind:value={$form.username}
            placeholder="Логин"
            {...$constraints.username}
        />
        {#if $errors.username}<span class="form-error">{$errors.username[0]}</span>{/if}
        <input
            type="password"
            name="password"
            bind:value={$form.password}
            placeholder="Пароль"
            {...$constraints.password}
        />
        {#if $errors.password}<span class="form-error">{$errors.password[0]}</span>{/if}

        {#if $message}<span class="form-error">{$message}</span>{/if}
    </section>

    <input class="btn-black" type="submit" value="Войти" />
    <h3 class="text-white text-xl">ИЛИ</h3>
    <a role="button" class="btn-black" href="/auth/register">Зарегистрироваться</a>
</form>
