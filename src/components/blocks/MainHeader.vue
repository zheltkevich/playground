<script setup>
import IconLogo from '@svg/images/IconLogo.vue'
import AppLink from '@ui/AppLink.vue'
</script>

<template>
    <header class="main-header">
        <div class="main-header__wrapper container">
            <div class="main-header__logo-wrapper">
                <AppLink
                    class="main-header__logo-link"
                    :to="'home'">
                    <IconLogo class="main-header__logo" />
                </AppLink>
                <span class="main-header__logo-text">Vue3 + Vite + Pinia</span>
            </div>
            <div class="main-header__content">
                <slot />
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.main-header {
    position: sticky;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--main-bg);
    box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 16px;
    }

    &__logo-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    &__logo-link {
        display: flex;
        align-items: center;
    }

    &__logo-text {
        display: flex;
        flex-shrink: 0;
        align-items: center;
    }

    &__logo {
        width: 24px;
        height: 24px;
    }

    &__content {
        display: flex;
    }
}
</style>
