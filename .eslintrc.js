export const parser = '@typescript-eslint/parser';
export const plugins = [
    '@typescript-eslint'
];
export const env = {
    node: true,
    es6: true,
};
export const parserOptions = {
    project: './tsconfig.json',
};
  