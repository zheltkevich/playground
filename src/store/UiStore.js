import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', {
    state: () => ({
        navigation: {
            isOpened: false,
        },
    }),
})
