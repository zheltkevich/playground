<script setup>
import { ref, computed } from 'vue'
import { useUiStore } from '@store/UiStore.js'
import { useAuthStore } from '@store/AuthStore.js'
import { useRouter, useRoute } from 'vue-router'
import AppButton from '@ui/AppButton.vue'
import AppLink from '@ui/AppLink.vue'

const NAVIGATION_ITEMS = [
    {
        to: 'home',
        title: 'Home page',
    },
    {
        to: 'about',
        title: 'About page',
    },
    {
        to: 'error',
        title: 'Error page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
]

const navigationItems = ref(NAVIGATION_ITEMS)

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const logOut = () => {
    authStore.logOut()
    router.push({ name: 'auth' })
}

const uiStore = useUiStore()
const expanded = computed(() => {
    return uiStore.isNavigationOpened
})
const show = () => uiStore.showNavigation()
const hide = () => uiStore.hideNavigation()

const setSelected = item => {
    return {
        selected: item.to === route.name,
    }
}
</script>

<template>
    <aside
        class="side-navigation"
        :class="{ expanded }">
        <AppButton
            class="side-navigation__close-button"
            type="button"
            @click="hide">
            ✕
        </AppButton>
        <AppButton
            type="button"
            class="side-navigation__expand-button"
            @click="show">
            &#5125;
        </AppButton>
        <header class="side-navigation__header">
            <h2 class="side-navigation__title">{{ $route.name }}</h2>
        </header>
        <div class="side-navigation__wrapper">
            <ul class="side-navigation__list">
                <li
                    v-for="(item, i) in navigationItems"
                    :key="i"
                    class="side-navigation__item">
                    <AppLink
                        :to="item.to"
                        class="side-navigation__item-button btn"
                        :class="setSelected(item)"
                        type="button">
                        {{ item.title }}
                    </AppLink>
                </li>
            </ul>
        </div>
        <footer class="side-navigation__footer">
            <AppLink
                :to="'about'"
                class="side-navigation__item-button btn"
                type="button">
                About
            </AppLink>
            <AppButton
                type="button"
                class="side-navigation__logout-button btn-warning"
                @click="logOut">
                Logout
            </AppButton>
        </footer>
    </aside>
</template>

<style lang="scss">
.side-navigation {
    position: fixed;
    z-index: 10;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    row-gap: 16px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-right: 1px solid transparent;
    background-color: var(--main-bg);

    @media (min-width: 768px) {
        border-right-color: var(--gray);
    }

    &__header {
        display: flex;
        padding-right: 16px;
        padding-left: 16px;
    }

    &__title {
        word-wrap: break-word;
    }

    &__wrapper {
        position: relative;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 16px;
        border-top: 1px solid var(--gray);
        border-bottom: 1px solid var(--gray);

        @include scrollbar(false, var(--main-bg));
    }

    &__list {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        row-gap: 8px;
    }

    &__item {
        display: flex;
        align-items: center;
    }

    &__item-button {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        background-color: var(--white);
    }

    &__close-button {
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 2;
        display: none;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        margin: unset;
        padding: unset;
        border: 1px solid var(--gray);
        border-radius: 4px;
        background-color: var(--white);
        color: var(--main);
        line-height: 1;
        cursor: pointer;

        @include hover {
            border-color: var(--main);
            background-color: var(--gray-hover);
        }

        @media (min-width: 768px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            display: none;
        }
    }

    &__expand-button {
        position: absolute;
        top: 16px;
        left: 100%;
        display: none;
        align-items: center;
        height: 40px;
        margin: unset;
        padding: unset;
        padding: 4px;
        border: 1px solid var(--gray);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #ffffff;
        color: var(--main);
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
        opacity: 1;
        cursor: pointer;
        transition: 0.3s ease-out;
        transition-property: opacity, background-color, border-color, transform;
        transform: scaleX(1) translateX(0);

        @include hover {
            border-color: var(--main);
            background-color: var(--gray-hover);
            transform: scale(1.2) translateX(2px);
        }

        @media (min-width: 768px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            display: none;
        }

        .side-navigation.expanded & {
            opacity: 0;
            pointer-events: none;
            transform: scaleX(0) translateX(-100%);
        }
    }

    &__footer {
        display: flex;
        padding-right: 16px;
        padding-left: 16px;
    }

    &__logout-button {
        display: flex;
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--gray);
        border-radius: 8px;
    }
}
</style>
