<script setup>
import { ref } from 'vue'
import { useUiStore } from '@store/UiStore.js'
import { useAuthStore } from '@store/AuthStore.js'
import { useRouter } from 'vue-router'
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
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
    {
        to: 'auth',
        title: 'Auth page',
    },
]

const navigationItems = ref(NAVIGATION_ITEMS)
const uiStore = useUiStore()
const authStore = useAuthStore()
const router = useRouter()
const logOut = () => {
    authStore.logOut()
    router.push({ name: 'auth' })
}

const show = () => uiStore.showNavigation()
const hide = () => uiStore.hideNavigation()
</script>

<template>
    <aside
        class="side-navigation"
        :class="{ expanded: uiStore.isNavigationOpened }">
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
        <h2 class="side-navigation__title">{{ $route.name }}</h2>
        <div class="side-navigation__wrapper">
            <ul class="side-navigation__list">
                <li
                    v-for="(item, i) in navigationItems"
                    :key="i"
                    class="side-navigation__item">
                    <AppLink
                        :to="item.to"
                        class="side-navigation__item-button"
                        type="button">
                        {{ item.title }}
                    </AppLink>
                </li>
            </ul>
        </div>
        <AppButton
            type="button"
            class="side-navigation__logout-button"
            @click="logOut">
            Logout
        </AppButton>
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
    border-right: 1px solid var(--gray);
    background-color: #e4e4e4;

    &__title {
        padding-right: 16px;
        padding-left: 16px;
        word-wrap: break-word;
    }

    &__wrapper {
        position: relative;
        display: flex;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-right: 16px;
        padding-left: 16px;

        // /* stylelint-disable-next-line at-rule-no-unknown */
        @include scrollbar(false, #e4e4e4);
    }

    &__list {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        row-gap: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    &__item {
        display: flex;
        align-items: center;
    }

    &__item-button {
        display: flex;
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        background-color: var(--main-bg);
        cursor: pointer;

        &:hover {
            border-color: var(--main);
            background-color: var(--gray);
        }
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
        background-color: var(--main-bg);
        color: var(--main);
        line-height: 1;
        cursor: pointer;

        @media (min-width: 768px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            display: none;
        }

        &:hover {
            border-color: var(--main);
            background-color: var(--gray);
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

        @media (min-width: 768px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            display: none;
        }

        &:hover {
            border-color: var(--main);
            background-color: var(--gray);
            transform: scale(1.2) translateX(2px);
        }

        .side-navigation.expanded & {
            opacity: 0;
            pointer-events: none;
            transform: scaleX(0) translateX(-100%);
        }
    }
}
</style>
