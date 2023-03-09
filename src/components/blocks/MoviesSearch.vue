<script setup>
import { ref } from 'vue'
import { useSearchMovieStore } from '@store/SearchMovieStore.js'

const searchMovie = ref('')
const searchMovieStore = useSearchMovieStore()
</script>

<template>
    <div class="movies-search">
        <form
            action="search"
            @submit.prevent="searchMovieStore.getPosts()">
            <input
                v-model="searchMovie"
                type="text"
                placeholder="Search movie" />
        </form>
    </div>
</template>
