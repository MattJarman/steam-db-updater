module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'standard'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier-standard'
  ],
  rules: {
    camelcase: 'off',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'expectCDK']
      }
    ]
  }
}
