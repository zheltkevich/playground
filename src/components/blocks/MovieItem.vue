<script setup>
import { useMovieStore } from '@store/MovieStore.js'
import AppButton from '../ui/AppButton.vue'

defineProps({
    movie: {
        type: Object,
        required: true,
        default: () => ({}),
    },
})

const movieStore = useMovieStore()
</script>

<template>
    <article class="movie-item">
        <img
            class="movie-item__image"
            :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
            :alt="movie.original_title" />
        <div class="movie-item__content-wrapper">
            <div class="movie-item__text-wrapper">
                <h4 class="movie-item__title">
                    {{ movie.original_title }} ({{ movie.release_date }})
                </h4>
                <p class="movie-item__description">{{ movie.overview }}</p>
            </div>
            <div class="movie-item__buttons">
                <AppButton
                    class="movie-item__button movie-item__button--action"
                    @click="movieStore.toggleWatched(movie.id)">
                    {{ movie.isWatched ? 'Просмотрено' : 'Непросмотрено' }}
                </AppButton>
                <AppButton
                    class="movie-item__button movie-item__button--delete"
                    @click="movieStore.deleteMovie(movie.id)">
                    Удалить
                </AppButton>
            </div>
        </div>
    </article>
</template>

<style lang="scss">
.movie-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    border: 1px solid var(--gray);
    border-radius: 24px;
    background-color: var(--white);

    &__image {
        display: flex;
        width: 120px;
        height: 120px;
        border: 1px solid var(--gray);
        border-radius: 16px;
    }

    &__content-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        justify-content: space-between;
    }

    &__text-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    &__buttons {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    &__button {
        padding: 6px 12px;
        border-radius: 8px;

        &--action {
            background-color: var(--access);

            &:hover {
                background-color: var(--access-hover);
            }
        }

        &--delete {
            background-color: var(--danger);

            &:hover {
                background-color: var(--danger-hover);
            }
        }
    }
}
</style>
