<script setup>
import { RouterLink } from 'vue-router'
import HeaderLayout from '@layouts/HeaderLayout.vue'
</script>

<template>
    <HeaderLayout
        v-if="$route.name !== 'auth'"
        class="header">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        |
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </HeaderLayout>
    <RouterView></RouterView>
</template>
