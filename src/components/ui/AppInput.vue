<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
})
</script>

<template>
    <div class="app-input">
        <input
            class="app-input__field"
            :type="type" />
    </div>
</template>

<style lang="scss">
.app-input {
    display: flex;
}
</style>
