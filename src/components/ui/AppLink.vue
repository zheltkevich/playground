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
const active = ref(false)

const mousedown = () => (active.value = true)
const mouseup = () => (active.value = false)
const mouseleave = () => (active.value = false)
const touchstart = () => (active.value = true)
const touchend = () => (active.value = false)
const click = () => emit('click')
</script>

<template>
    <router-link
        :to="{ path: to }"
        class="app-link"
        :class="[{ active }, type]"
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

    &.active {
        opacity: 0.6;
    }
}
</style>
