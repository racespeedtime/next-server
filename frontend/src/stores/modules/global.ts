// 定义是否折叠小仓库（选择式Api写法）
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { DEFAULT_THEME } from '@/config/index.ts'

export const useGlobalStore = defineStore('global', {
  persist: true,
  state: () => {
    return {
      // 是否折叠菜单
      isCollapse: false,
      // 菜单展开宽度[默认：220px]
      menuWidth: 220,
      // 菜单左边框颜色
      menuBLSColor: '',
      // 默认关闭黑暗模式
      isDark: useDark(),
      // ElementPlus 尺寸大小
      dimension: 'default' as 'default' | 'small' | 'large',
      // 当前页面是否全屏
      maximize: false,
      // 选择主题[默认兔子坦克形态]
      themeColor: DEFAULT_THEME,
      // 布局模式 (纵向：vertical | 经典：classic | 横向：crosswise | 分栏：column)
      layout: 'vertical',
      // 路由动画
      transition: 'fade-default',
      // 菜单是否可展开单个[默认：true仅仅一个]
      uniqueOpened: true,
      // 灰色模式
      isGrey: false,
      // 是否初始化完了静态路由
      isInitRoute: false,
    }
  },
  actions: {
    // 设置当前global.ts所有参数值
    setGlobalState(...args: any) {
      this.$patch({ [args[0]]: args[1] })
    },

    setCollapse(value: boolean) {
      this.isCollapse = !value
      return this.isCollapse
    },
    // 设置左侧菜单宽度
    setMenuWidth(value: number) {
      this.menuWidth = value
      return this.menuWidth
    },
    // 设置ElementPlus尺寸
    setDimension(value: 'default' | 'small' | 'large') {
      this.dimension = value
    },
    // 设置左侧菜单边框颜色[纵向和经典布局]
    setMenuBLSColor() {
      if (this.isDark) {
        // 暗黑
        this.menuBLSColor = '#121212'
      }
      else {
        // 明亮
        this.menuBLSColor = '#ffffff'
      }
      return this.menuBLSColor
    },
  },
})
