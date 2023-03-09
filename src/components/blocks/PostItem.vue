<script setup>
defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<template>
    <li class="post-item">
        <h4 class="post-item__title">{{ item.title }}</h4>
        <p class="post-item__description">{{ item.body }}</p>
    </li>
</template>

<style lang="scss">
.post-item {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding: 16px 18px;
    border: 1px solid var(--gray);
    border-radius: 16px;
}
</style>
