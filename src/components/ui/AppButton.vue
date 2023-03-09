<script setup>
import { ref } from 'vue'
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
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
        <slot></slot>
    </button>
</template>

<style lang="scss">
.app-button {
    display: flex;
    padding: unset;
    border: unset;
    cursor: pointer;
    user-select: none;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    transition-property: color, background-color, opacity, border-color;

    &.pushed {
        opacity: 0.6;
    }
}
</style>
