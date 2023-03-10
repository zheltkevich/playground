<script setup>
import { ref } from 'vue'
import AppLoader from '@ui/AppLoader.vue'
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['click'])

const pushed = ref(false)

const mousedown = () => (pushed.value = true)
const mouseup = () => (pushed.value = false)
const mouseleave = () => (pushed.value = false)
const touchstart = () => (pushed.value = true)
const touchend = () => (pushed.value = false)
const click = () => emit('click')
</script>

<template>
    <button
        class="app-button"
        :class="{ pushed, loading }"
        :type="type"
        :disabled="disabled"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @touchstart="touchstart"
        @touchend="touchend"
        @click="click"
        @mouseleave="mouseleave">
        <span class="app-button__loader-container">
            <AppLoader
                class="app-button__loader"
                size="100%"
                type="small">
            </AppLoader>
        </span>
        <span class="app-button__slot">
            <slot />
        </span>
    </button>
</template>

<style lang="scss">
.app-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: unset;
    border: unset;
    cursor: pointer;
    user-select: none;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    transition-property: color, background-color, opacity, border-color,
        transform;

    &.pushed {
        opacity: 0.6;
    }

    &__loader-container {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        width: 16px;
        height: 16px;
        opacity: 0;
        pointer-events: none;
        transform: translateX(-50%) translateY(-50%);

        .app-button.loading & {
            opacity: 1;
        }
    }

    &__slot {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;

        .app-button.loading & {
            opacity: 0;
        }
    }
}
</style>
