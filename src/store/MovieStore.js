import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: [
            {
                id: 1,
                original_title: 'Title 1',
                overview: 'lorem ipsum 1',
                poster_path: '/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg',
                release_date: '01-05-2001',
                isWatched: false,
            },
            {
                id: 2,
                original_title: 'Title 2',
                overview: 'lorem ipsum 2',
                poster_path: '222.png',
                release_date: '20-06-2003',
                isWatched: true,
            },
        ],
        activeTab: 2,
    }),
    getters: {
        watchedMovies() {
            return this.movies.filter((element) => element.isWatched)
        },
        totalMoviesCount() {
            return this.movies.length
        },
        watchedMoviesCount() {
            const watchedMovies = this.movies.filter(
                (element) => element.isWatched
            )
            return watchedMovies.length
        },
    },
    actions: {
        setActiveTab(id) {
            this.activeTab = id
        },
        toggleWatched(id) {
            const index = this.movies.findIndex((element) => element.id === id)
            this.movies[index].isWatched = !this.movies[index].isWatched
        },
        deleteMovie(id) {
            this.movies = this.movies.filter((element) => element.id !== id)
        },
    },
})
