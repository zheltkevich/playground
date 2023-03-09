import { defineStore } from 'pinia'
import { PreferenceKeeperLS } from '@utils/PreferenceKeeper/PreferenceKeeper.js'
import router from '@router/router.js'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        login() {
            this.isLoggedIn = true
            router.replace({ name: 'home' })
            PreferenceKeeperLS.setItem('loggedIn', this.isLoggedIn)
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
        },
    },
    getters: {
        getLoggedIn() {
            return this.isLoggedIn
        },
    },
})
