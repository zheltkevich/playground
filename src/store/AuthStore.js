import { defineStore } from 'pinia'
import { PreferenceKeeperLS } from '@utils/PreferenceKeeper/PreferenceKeeper.js'
import router from '@router/router.js'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isLoggedIn: false,
        loading: false,
    }),
    actions: {
        async login() {
            this.loading = true
            setTimeout(() => {
                this.isLoggedIn = true
                router.replace({ name: 'home' })
                this.loading = false
                PreferenceKeeperLS.setItem('loggedIn', this.isLoggedIn)
            }, 1000)
        },
        logOut() {
            this.isLoggedIn = false
            router.replace({ name: 'auth' })
            PreferenceKeeperLS.deleteItem('loggedIn')
        },
        fetchLogin() {
            const loggedFromLS = PreferenceKeeperLS.getItem('loggedIn')
            if (loggedFromLS) this.isLoggedIn = loggedFromLS
            else this.isLoggedIn = false

            return this.isLoggedIn
        },
        waiting() {
            setTimeout(() => {
                return true
            }, 1000)
        },
    },
    getters: {
        getLoggedIn() {
            return this.isLoggedIn
        },
    },
})
