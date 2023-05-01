module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      project: './tsconfig.json',
    },
    ignorePatterns: [
        '.eslintrc.js', 
        'node_modules/'
    ],
};
  