<script setup>
import MainHeader from '@blocks/MainHeader.vue'
import SideNavigation from '@blocks/SideNavigation.vue'
</script>

<template>
    <MainHeader
        v-if="$route.name !== 'auth'"
        class="header">
        <!-- <router-link :to="{ name: 'home' }">Home</router-link>
        |
        <router-link :to="{ name: 'about' }">About</router-link> -->
    </MainHeader>
    <main
        class="main"
        :class="{ container: $route.name !== 'auth' }">
        <SideNavigation
            v-if="$route.name !== 'auth'"
            class="main__side-navigation" />
        <slot />
    </main>
</template>

<style lang="scss">
#app {
    display: flex;
    flex-direction: column;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    background-color: var(--main-bg);

    > header {
        min-height: 48px;
    }

    > main {
        position: relative;
        display: flex;
        flex-grow: 1;
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
    }
}

.main {
    &__side-navigation {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 100%;
        transition: 0.2s ease-out;
        transition-property: transform;
        transform: translateX(-100%);

        @media (min-width: 768px) {
            width: 240px;
        }

        @media (min-width: 1024px) {
            position: static;
            height: auto;
            transform: translateX(0);
        }

        &.expanded {
            transform: translateX(0);
        }
    }
}
</style>
