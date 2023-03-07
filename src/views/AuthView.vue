<script setup>
import AppButton from '../components/ui/AppButton.vue'
</script>

<template>
    <div class="auth-view">
        <div class="auth-view__container">
            <h1 class="auth-view__title">Личный кабинет</h1>
            <form
                class="auth-view__form"
                action="">
                <input type="text" />
                <input type="password" />
                <AppButton class="auth-view__submit">Войти</AppButton>
            </form>
            <ul class="auth-view__links">
                <li class="auth-view__link">
                    <a href="#">Зарегистрироваться (инструкция)</a>
                </li>
                <li class="auth-view__link">
                    <a href="#">Забыли пароль?</a>
                </li>
                <li class="auth-view__link">
                    <a href="#">Обратиться в службу поддержки</a>
                </li>
            </ul>
            <ul class="auth-view__app-links">
                <li class="auth-view__app-link">
                    <a href="#">Apple</a>
                </li>
                <li class="auth-view__app-link">
                    <a href="#">Android</a>
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
    background-image: url('@images/kvado-logo-bg.png');
    background-position: center;

    &__container {
        display: flex;
        flex-direction: column;
        padding: 32px;
        border: 1px solid #eeeeee;
        border-radius: 24px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
    }
}
</style>
