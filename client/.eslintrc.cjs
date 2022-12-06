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
    'import/prefer-default-export': 'off',
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
            ['@/components', './src/components'],
            ['@/hooks', './src/hooks'],
            ['@/views', './src/views'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
    ],
  },
};
