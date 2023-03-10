<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostsStore } from '@store/PostsStore.js'
import PostItem from '@blocks/PostItem.vue'
import AppLoader from '@ui/AppLoader.vue'

onMounted(() => {
    postsStore.fetchPosts()
})
const searchValue = ref('')

const postsStore = usePostsStore()
const postsList = computed(() => {
    return postsStore.getPosts
})
</script>

<template>
    <div class="posts-list">
        <h2 class="posts-list__title">Posts list</h2>
        <input
            v-model="searchValue"
            type="text" />

        <ul class="posts-list__list">
            <AppLoader
                v-if="postsStore.loading"
                class="posts-list__loader" />
            <PostItem
                v-for="(item, i) in postsList"
                :key="i"
                :item="item">
            </PostItem>
        </ul>
    </div>
</template>

<style lang="scss">
.posts-list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    &__list {
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    &__loader {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
