import { defineStore } from 'pinia'
import { PostService } from '@api/PostService.js'

const url =
    'https://api.themoviedb.org/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query='

export const useSearchMovieStore = defineStore('searchMovieStore', {
    state: () => ({
        movies: [],
        posts: [],
    }),
    actions: {
        async getMovies(searchQuery) {
            const result = await fetch(`${url}${searchQuery}`)
            const data = await result.json()
            this.movies.push(data)
        },

        async getPosts() {
            const posts = await PostService.getAll()
            this.posts = this.posts.push(posts)
        },
    },
    getters: {
        getPosts() {
            return this.posts
        },
    },
})
