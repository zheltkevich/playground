<script setup>
import IconLogo from '@svg/images/IconLogo.vue'
import AppLink from '@ui/AppLink.vue'
import IconBurgerMenu from '@svg/icons/IconBurgerMenu.vue'
import { ref } from 'vue'
import AppButton from '@ui/AppButton.vue'

const menuOpened = ref(false)

const burgerClick = () => {
    menuOpened.value = !menuOpened.value
}
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
            <AppButton
                class="main-header__burger"
                @click="burgerClick">
                <IconBurgerMenu :active="menuOpened"></IconBurgerMenu>
            </AppButton>
        </div>
    </header>
</template>

<style lang="scss">
.main-header {
    position: sticky;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--main-bg);
    box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);

    &__wrapper {
        position: relative;
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

    &__burger {
        border: 1px solid var(--gray-light);
        border-radius: 8px;
        background-color: var(--main-bg);

        @media (min-width: 768px) {
            display: none;
        }

        &:hover {
            border-color: var(--main);
            background-color: var(--gray);
        }
    }
}
</style>
