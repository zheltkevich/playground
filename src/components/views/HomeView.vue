<script setup>
import FavouriteMovies from '@blocks/FavouriteMovies.vue'
</script>

<template>
    <div class="homeview">
        <h1>HomeView</h1>
        <FavouriteMovies></FavouriteMovies>
    </div>
</template>

<style lang="scss">
.homeview {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 16px;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 16px 24px;
    }
}
</style>
