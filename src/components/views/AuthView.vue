<script setup>
import AppButton from '@ui/AppButton.vue'
import { useAuthStore } from '@store/AuthStore'

const authStore = useAuthStore()

const submit = () => {
    authStore.login()
}
</script>

<template>
    <div class="auth-view">
        <div class="auth-view__container">
            <h1 class="auth-view__title">Личный кабинет</h1>
            <form
                class="auth-view__form"
                action=""
                @submit.prevent>
                <input
                    class="auth-view__input"
                    type="text" />
                <input
                    class="auth-view__input"
                    type="password" />
                <div class="auth-view__buttons">
                    <AppButton
                        class="auth-view__button auth-view__button--submit"
                        :loading="authStore.loading"
                        @click="submit">
                        Войти
                    </AppButton>
                    <AppButton class="auth-view__button auth-view__button--reg">
                        Зарегистрироваться
                    </AppButton>
                </div>
            </form>
            <ul class="auth-view__links">
                <li class="auth-view__link">
                    <a href="#">Забыли пароль?</a>
                </li>
                <li class="auth-view__link">
                    <a href="#">Обратиться в службу поддержки</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
.auth-view {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #cfd1e7;
    background-position: center;

    &__container {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        padding: 24px 32px;
        border: 1px solid var(--gray);
        border-radius: 24px;
        background-color: var(--main-bg);
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__input {
        padding: 8px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        transition: 0.2s ease-out;
        transition-property: border-color;

        &:focus,
        &:hover {
            border-color: var(--main);
            outline: none;
        }
    }

    &__buttons {
        display: flex;
        column-gap: 8px;
    }

    &__button {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 80px;
        min-height: 20px;
        padding: 8px 16px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        background-color: var(--main-bg);
        line-height: 16px;

        &:hover:not(.disabled) {
            border-color: var(--main);
        }

        &--submit {
            background-color: var(--access);

            &:hover:not(.disabled) {
                background-color: var(--access-hover);
            }
        }

        &--reg {
            background-color: var(--white);

            &:hover:not(.disabled) {
                background-color: var(--gray-hover);
            }
        }
    }

    &__links {
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }
}
</style>
