import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: [
            {
                id: 1,
                original_title: 'Title 1',
                overview: 'lorem ipsum 1',
                poster_path: '111.png',
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
    }),
})
