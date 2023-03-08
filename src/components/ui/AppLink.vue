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
    transition-duration: 0.2s;
    transition-property: color, background-color, opacity, border-color;

    &.button {
        text-decoration: none;
    }

    &.pushed {
        opacity: 0.6;
        transition-duration: 0.1s;
    }

    svg {
        .app-link.pushed & {
            opacity: 0.6;
        }
    }
}
</style>
