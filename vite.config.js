import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@css': path.resolve(__dirname, './src/styles/css'),
            '@scss': path.resolve(__dirname, './src/styles/scss'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
            '@blocks': path.resolve(__dirname, './src/components/blocks'),
            '@views': path.resolve(__dirname, './src/components/views'),
            '@assets': path.resolve(__dirname, './public/assets'),
            '@images': path.resolve(__dirname, './public/images'),
            '@svg': path.resolve(__dirname, './src/components/svg'),
            '@store': path.resolve(__dirname, './src/store'),
            '@api': path.resolve(__dirname, './src/api'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@models': path.resolve(__dirname, './src/models'),
            '@router': path.resolve(__dirname, './src/router'),
        },
    },
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
    css: {
        devSourcemap: true,
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import '@/styles/scss/mixins/mixins.scss';
              `,
            },
        },
    },
})
