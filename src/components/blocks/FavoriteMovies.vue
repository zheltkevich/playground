<script setup>
import { useMovieStore } from '@store/MovieStore.js'
import AppButton from '../ui/AppButton.vue'
import MovieItem from './MovieItem.vue'

const movieStore = useMovieStore()
</script>

<template>
    <div class="favorite-movies">
        <div class="tabs">
            <AppButton
                class="tabs__tab tabs__tab--favorite"
                @click="movieStore.setActiveTab(1)">
                Favorite
            </AppButton>
            <AppButton
                class="tabs__tab tabs__tab--search"
                @click="movieStore.setActiveTab(2)">
                Search
            </AppButton>
        </div>
        <div class="favorite-movies__wrapper">
            <div
                v-if="movieStore.activeTab === 1"
                class="favorite-movies__movies-container">
                <div
                    class="favorite-movies__list favorite-movies__list--watched">
                    <h2>
                        Watched movies ({{ movieStore.watchedMoviesCount }})
                    </h2>
                    <MovieItem
                        v-for="movie in movieStore.watchedMovies"
                        :key="movie.id"
                        :movie="movie">
                    </MovieItem>
                </div>
                <div class="favorite-movies__list favorite-movies__list--all">
                    <h2>All movies ({{ movieStore.totalMoviesCount }})</h2>
                    <MovieItem
                        v-for="movie in movieStore.movies"
                        :key="movie.id"
                        :movie="movie">
                    </MovieItem>
                </div>
            </div>
            <div
                v-else
                class="favorite-movies__search-container">
                <h2>Search</h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.favorite-movies {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    &__wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    &__movies-container {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    &__search-container {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }
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
