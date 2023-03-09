import { defineStore } from 'pinia'
import { PostService } from '@api/PostService.js'

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: [],
        loading: false,
    }),
    getters: {
        getPosts() {
            return this.posts
        },
    },
    actions: {
        async fetchPosts() {
            try {
                this.loading = true
                this.posts = await PostService.getAll()
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        },
    },
})
