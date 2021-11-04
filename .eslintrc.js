module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        'import/order': ['error', { 'newlines-between': 'always' }],
    },
};
