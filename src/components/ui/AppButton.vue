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

const mousedown = () => {
    pushed.value = true
}
const mouseup = () => {
    pushed.value = false
}
const click = () => {
    emit('click')
}
</script>

<template>
    <button
        class="app-button"
        :class="{ pushed }"
        :type="type"
        :disabled="disabled"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @click="click">
        <span
            v-if="loading"
            class="app-button__preloader-container">
            <AppLoader
                size="100%"
                type="small">
            </AppLoader>
        </span>
        <slot v-else></slot>
    </button>
</template>

<style lang="scss">
.app-button {
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

    &__preloader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
    }
}
</style>
