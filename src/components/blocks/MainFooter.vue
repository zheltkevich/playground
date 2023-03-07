<script setup></script>

<template>
    <footer class="main-footer">
        <div class="main-footer__wrapper container"></div>
    </footer>
</template>

<style lang="scss">
.main-footer {
    display: flex;
    flex-direction: column;
    background-color: #abaeb4;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
    }
}
</style>
