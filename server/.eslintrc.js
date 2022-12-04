module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  env: {
    node: true
  },
  extends: [
    'standard-with-typescript',
    'airbnb-typescript/base'
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
}
