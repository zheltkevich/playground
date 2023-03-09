<script setup>
import PostsList from '@blocks/PostsList.vue'
</script>

<template>
    <div class="homeview">
        <h1>HomeView</h1>
        <PostsList class="about-view__posts-list"></PostsList>
    </div>
</template>

<style lang="scss">
.homeview {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 16px;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 24px;
    }
}
</style>
