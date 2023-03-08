<script setup>
import { ref } from 'vue'
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
const expanded = ref(false)

const expand = () => (expanded.value = true)
const close = () => (expanded.value = false)
</script>

<template>
    <aside
        class="side-navigation"
        :class="{ expanded }">
        <AppButton
            class="side-navigation__close-button"
            type="button"
            @click="close">
            ✕
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
            class="side-navigation__expand-button"
            @click="expand">
            &#5125;
        </AppButton>
    </aside>
</template>

<style lang="scss">
.side-navigation {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-right: 1px solid var(--gray-light);
    background-color: #e4e4e4;

    &__title {
        margin-bottom: 16px;
        word-wrap: break-word;
    }

    &__wrapper {
        position: relative;
        display: flex;
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
        display: flex;
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--gray-light);
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
            background-color: var(--gray-light);
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
        border: 1px solid var(--gray-light);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #ffffff;
        color: var(--main);
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
        opacity: 1;
        cursor: pointer;
        transition: 0.2s ease-out;
        transition-property: opacity, background-color;

        @media (min-width: 768px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            display: none;
        }

        &:hover {
            background-color: var(--gray);
        }

        .side-navigation.expanded & {
            opacity: 0;
            pointer-events: none;
        }
    }
}
</style>
