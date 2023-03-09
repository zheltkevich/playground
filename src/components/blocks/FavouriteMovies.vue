<script setup>
import { useMovieStore } from '@store/MovieStore.js'
import AppButton from '../ui/AppButton.vue'
import MovieItem from './MovieItem.vue'

const movieStore = useMovieStore()
</script>

<template>
    <div class="favourite-movies">
        <div class="tabs">
            <AppButton class="tabs__tab tabs__tab--favorite">
                Favorite
            </AppButton>
            <AppButton class="tabs__tab tabs__tab--search"> Search </AppButton>
        </div>
        <MovieItem
            v-for="movie in movieStore.movies"
            :key="movie.id"
            :movie="movie">
        </MovieItem>
    </div>
</template>

<style lang="scss">
.favourite-movies {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

.tabs {
    display: flex;
    column-gap: 8px;

    &__tab {
        padding: 6px 12px;
        border: 1px solid var(--gray);
        border-radius: 8px;
        background-color: var(--white);

        &:hover {
            border-color: var(--main);
            background-color: var(--gray);
        }
    }
}
</style>
