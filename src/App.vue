<script setup>
// import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// const foo = ref(1)

// // eslint-disable-next-line no-console
// console.log(foo.value)
</script>

<template>
    <div>
        <RouterLink
            :to="{
                name: 'home',
            }">
            <img
                src="/vite.svg"
                class="logo"
                alt="Vite logo" />
        </RouterLink>
        <RouterLink
            :to="{
                name: 'about',
            }">
            <img
                src="./assets/vue.svg"
                class="logo vue"
                alt="Vue logo" />
        </RouterLink>
    </div>

    <RouterView></RouterView>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    transition: filter 300ms;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0, 0, 2em, #664466);
}

.logo.vue:hover {
    filter: drop-shadow(0, 0, 2em, #42b883);
}
</style>
