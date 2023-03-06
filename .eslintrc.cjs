module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['*.html'],
            processor: 'vue/.vue',
        },
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'error',
        'quotes': ['error', 'single'],
        'no-console': [
            'error',
            {
                allow: [
                    'warn',
                    'error',
                ],
            },
        ],
    },
}
