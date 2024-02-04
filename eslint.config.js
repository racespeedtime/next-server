import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    typescript: true,
    vue: true,
  },
  {
    files: ['frontend/src/**/*.{vue,ts,tsx,js}'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['backend/{src,apps,libs,test}/**/*.ts'],
    rules: {
      'ts/interface-name-prefix': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/explicit-module-boundary-types': 'off',
      'ts/no-explicit-any': 'off',
      'ts/consistent-type-imports': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
