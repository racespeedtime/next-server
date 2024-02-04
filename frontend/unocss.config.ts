import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  presets: [presetUno(), presetAttributify(), presetIcons({ warn: true })],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--el-color-primary)',
      },
    },
  },
})
