import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import simpleHtmlPlugin from 'vite-plugin-simple-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  const isProduction = env.mode === 'production'
  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      Components({ resolvers: [ElementPlusResolver({ importStyle: false })] }),
      vueSetupExtend(),
      createSvgIconsPlugin({
        iconDirs: [resolve(__dirname, './src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      simpleHtmlPlugin({
        minify: isProduction,
        inject: { data: { title: env.VITE_WEB_TITLE } },
      }),
    ],
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5730, // 端口号
      hmr: true,
      open: true, // 自动打开
      proxy: {
        // 代理跨域
        '/api': {
          // 配置哪个环境下的
          target: 'http://localhost:3000/api',
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url']
                = new URL(req.url || '', options?.target?.toString())?.href || ''
            })
          },
        },
      },
    },
    esbuild: {
      // 在生产环境全部去除console 和 debugger
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  }
})
