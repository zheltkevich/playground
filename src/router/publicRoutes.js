const publicRoutes = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
        // meta: { requiresAuth: false },
    },
    {
        path: '/:pathMatch(.*)',
        name: 'error',
        component: () => import('@/views/ErrorView.vue'),
        // meta: { requiresAuth: false },
    },
]

export default publicRoutes
