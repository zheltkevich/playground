<script setup>
import { ref } from 'vue'

defineProps({
    to: {
        type: String,
        default: () => '',
    },
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: () => false,
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
    <router-link
        :to="{ path: to }"
        class="app-link"
        :class="[{ pushed }, type]"
        :disabled="disabled"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @mouseleave="mouseleave"
        @touchstart="touchstart"
        @touchend="touchend"
        @click="click">
        <slot></slot>
    </router-link>
</template>

<style lang="scss">
.app-link {
    display: flex;
    color: inherit;
    opacity: 1;
    user-select: none;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    transition-property: color, background-color, opacity, border-color,
        transform;

    &.button {
        text-decoration: none;
    }

    &.pushed {
        opacity: 0.6;
    }

    svg {
        .app-link.pushed & {
            opacity: 0.6;
        }
    }
}
</style>
