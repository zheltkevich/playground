<script setup>
import { ref } from 'vue'
import AppButton from '../ui/AppButton.vue'

const NAVIGATION_ITEMS = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
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
            X
        </AppButton>
        <h2 class="side-navigation__title">{{ $route.name }}</h2>
        <div class="side-navigation__wrapper">
            <ul class="side-navigation__list">
                <li
                    v-for="(item, i) in navigationItems"
                    :key="i"
                    class="side-navigation__item">
                    <AppButton
                        class="side-navigation__item-button"
                        type="button">
                        {{ item }}
                    </AppButton>
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
    width: 240px;
    padding: 16px;
    border-right: 1px solid var(--gray-light);
    background-color: var(--main-bg);

    &__title {
        margin-bottom: 16px;
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
        border: 1px solid var(--gray);
        border-radius: 8px;
        background-color: transparent;
        cursor: pointer;

        &:hover {
            background-color: var(--gray);
        }
    }

    &__close-button {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        margin: unset;
        padding: 8px;
        border: unset;
        background-color: transparent;
        color: var(--main);
        cursor: pointer;

        @media (min-width: 1024px) {
            display: none;
        }
    }

    &__expand-button {
        position: absolute;
        top: 16px;
        left: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        margin: unset;
        padding: unset;
        padding: 4px;
        border: 1px solid var(--gray-light);
        background-color: #ffffff;
        color: var(--main);
        box-shadow: 0 4px 8px 0 rgb(34 60 80 / 0.1);
        cursor: pointer;

        @media (min-width: 1024px) {
            display: none;
        }

        &:hover {
            background-color: var(--gray);
        }

        .side-navigation.expanded & {
            display: none;
        }
    }
}
</style>
