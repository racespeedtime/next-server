import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { useTabsStore } from './tabs'
import { useGlobalStore } from './global'
import {
  generateFlattenRoutes,
  generateTreeRoutes,
  parseStaticRoutes,
} from '@/utils/route'
import { getAllBreadcrumbList } from '@/utils/index.ts'
import { menuApi } from '@/api/system/menu'
import type { FrontendFlatRoute, FrontendRecursionRoute } from '@/typings'
import { LOGIN_URL } from '@/config'
import { staticRoutes } from '@/routers/modules/staticRouter'

export const useAuthStore = defineStore('auth', {
  persist: {
    paths: ['token', 'userInfo'],
  },
  state() {
    return {
      token: null as string | null,
      // 扁平化路由数据
      flattenMenuList: [] as FrontendFlatRoute[],
      // 递归之后的菜单数据
      recursiveMenuList: [] as FrontendRecursionRoute[],
      // 用户信息
      userInfo: {} as any,
    }
  },

  actions: {
    // 获取后端菜单数据
    async listRouters() {
      // 传递给后端要查哪些角色的id的路由,超管就不传即全部,看具体接口实现
      const roles = this.userInfo.roles?.some(r => r.code === 'SUPER_ADMIN')
        ? null
        : this.userInfo.roles?.map(p => p.id)

      const menuList = await menuApi.getRoles(roles)
      this.flattenMenuList = generateFlattenRoutes(menuList)
      this.recursiveMenuList = generateTreeRoutes(menuList)
    },
    setUserInfo(data: any) {
      this.userInfo = data
    },
    setToken(token: string) {
      this.token = token
    },
    logout() {
      useTabsStore().$reset()
      useGlobalStore().$reset()
      this.$reset()
      // 必须使用这个把页面缓存刷掉
      window.location.replace(LOGIN_URL)
    },
  },
  getters: {
    // 菜单权限列表 ==> 原始后端接口菜单数据，扁平化之后的一维数组菜单，主要用来添加动态路由
    getMenuList: state => state.flattenMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，这里的菜单将后端数据进行递归,剔除隐藏的,转换alwaysShow
    showMenuList(state) {
      return [...parseStaticRoutes(cloneDeep(staticRoutes)), ...state.recursiveMenuList] as FrontendRecursionRoute[]
    },
    // 递归处理后的所有面包屑导航列表
    getBreadcrumbList: state => getAllBreadcrumbList(state.recursiveMenuList),
    getUserRolesName(state) {
      return state.userInfo.roles?.map(p => p.name).toString() || null
    },
  },
})
