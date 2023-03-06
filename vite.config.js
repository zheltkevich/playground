import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            fix: true,
            cache: false,
            failOnError: false,
        }),
        stylelintPlugin({
            fix: true,
            cache: false,
        }),
    ],
    // server: {
    //     hmr: {
    //         overlay: true,
    //     },
    // },
    css: {
        devSourcemap: true,
    },
})
