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
    padding: 8px 16px;
    color: inherit;

    &.button {
        text-decoration: none;
    }

    &.pushed {
        opacity: 0.7;
    }
}
</style>
