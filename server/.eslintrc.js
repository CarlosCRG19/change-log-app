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
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
   ]
  },
  settings: {
    'import/resolver': [
      {
        typescript: {
          alwaysTryTypes: true,
        }
      },
      {
        node: {
          moduleDirectory: ['node_modules', 'src/']
        }
      }
    ]
  }
}
