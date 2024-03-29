/* eslint-env node, es2018 */
module.exports = {
  extends: [require.resolve('@jcoreio/toolchain/eslint.config.cjs')],
  env: {
    es6: true,
  },
  globals: {
    process: true,
  },
  rules: {
    '@typescript-eslint/ban-types': 0,
  },
}
