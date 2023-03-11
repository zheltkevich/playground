import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', {
    state: () => ({
        navigation: {
            isOpened: false,
        },
    }),
    getters: {
        isNavigationOpened() {
            return this.navigation.isOpened
        },
    },
    actions: {
        toggleNavigation() {
            this.navigation.isOpened = !this.navigation.isOpened
        },
        showNavigation() {
            this.navigation.isOpened = true
        },
        hideNavigation() {
            this.navigation.isOpened = false
        },
    },
})
