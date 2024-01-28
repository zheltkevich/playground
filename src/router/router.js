import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@store/AuthStore.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@views/HomeView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/home',
            redirect: { name: 'home' },
            meta: { requiresAuth: true },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@views/AboutView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@views/AuthView.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/post_checking',
            name: 'post_checking',
            component: () => import('@views/PostCheckingView.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/:pathMatch(.*)',
            name: 'error',
            component: () => import('@views/ErrorView.vue'),
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const { requiresAuth } = to.meta
    const authStore = useAuthStore()

    authStore.fetchLogin()

    if (requiresAuth && !authStore.getLoggedIn) next({ name: 'auth' })
    else if (to.name === 'auth' && authStore.getLoggedIn) next({ name: 'home' })
    else next()
})

export default router
