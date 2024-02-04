import { createApp } from 'vue'

// SVG插件配置
import 'virtual:svg-icons-register'

// 引入ElementPlus所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入ElementPlus的css
import 'element-plus/dist/index.css'

// 引入ElementPlus的暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入animate
import 'animate.css'

// 引入styles
import '@/styles/index.scss'

import 'uno.css'

import App from './App.vue'
import pinia from '@/stores/index.ts'

// 引入全局自定义指令
import directives from '@/directives/index'

// 引入路由
import router from '@/routers'

// 引入仓库pinia

// 创建app
const app = createApp(App)

// 注册ElementPlus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(router).use(pinia).use(directives).mount('#app')
