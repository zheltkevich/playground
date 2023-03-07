<script setup>
import IconLogo from '@svg/images/IconLogo.vue'
</script>

<template>
    <header class="main-header">
        <div class="main-header__wrapper container">
            <router-link :to="{ name: 'home' }">
                <IconLogo class="main-header__logo" />
            </router-link>
            <div class="main-header__content">
                <slot />
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.main-header {
    display: flex;
    flex-direction: column;
    background-color: #adc3e4;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
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
