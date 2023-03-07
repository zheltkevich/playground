<script setup>
import MainHeader from '@blocks/MainHeader.vue'
import MainFooter from '@blocks/MainFooter.vue'
import SideNavigation from '@blocks/SideNavigation.vue'
</script>

<template>
    <MainHeader
        v-if="$route.name !== 'auth'"
        class="header">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        |
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </MainHeader>
    <main class="main">
        <slot />
        <SideNavigation class="main__side-navigation" />
    </main>
    <MainFooter
        v-if="$route.name !== 'auth'"
        class="footer">
    </MainFooter>
</template>

<style lang="scss">
#app {
    display: flex;
    flex-direction: column;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    background-color: var(--main-bg);

    > header {
        min-height: 40px;
    }

    > main {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    > footer {
        min-height: 40px;
    }
}

.main {
    &__side-navigation {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        height: 100%;
        background-color: aqua;
        transition: 0.2s ease-out;
        transition-property: transform;
        transform: translateX(-96%);

        &:hover {
            transform: translateX(0);
        }
    }
}
</style>
