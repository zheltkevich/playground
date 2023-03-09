<script setup></script>

<template>
    <div class="about-view">
        <h1 class="about-view__title">AboutView</h1>
    </div>
</template>

<style lang="scss">
.about-view {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 24px;
    }
}
</style>
