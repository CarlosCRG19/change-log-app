module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'import/prefer-default-export': 'warn',
  },
  settings: {
    'import/resolver': [
      {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx'],
        },
      },
      {
        alias: {
          map: [
            ['@/hooks', './src/hooks'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
    ],
  },
};
