<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostsStore } from '@store/PostsStore.js'
import PostItem from '@blocks/PostItem.vue'
import AppLoader from '@ui/AppLoader.vue'
import AppInput from '@ui/AppInput.vue'

onMounted(() => {
    postsStore.fetchPosts()
})

const postsStore = usePostsStore()

const searchValue = ref('')
const postsList = computed(() => {
    if (searchValue.value) {
        return postsStore.getPosts.filter(post =>
            post.title.toLowerCase().includes(searchValue.value)
        )
    }
    return postsStore.getPosts
})

const inputValueHandler = val => {
    searchValue.value = val
}
</script>

<template>
    <div class="posts-list">
        <h2 class="posts-list__title">Posts list</h2>
        <AppInput
            type="text"
            placeholder="Search"
            @input="inputValueHandler" />

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
