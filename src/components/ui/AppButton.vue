<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
})
</script>

<template>
    <button
        v-bind="listeners"
        class="app-button"
        :type="type">
        <slot></slot>
    </button>
</template>

<style lang="scss">
.app-button {
    display: flex;
    padding: 8px 16px;
    border-radius: 8px;
}
</style>
