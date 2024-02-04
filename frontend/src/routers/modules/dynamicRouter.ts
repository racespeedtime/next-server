import type { RouteRecordRaw } from 'vue-router'
import { errorRoute } from './staticRouter'
import { useAuthStore } from '@/stores/modules/auth.ts'
import { noticeWarning } from '@/utils/msgNotice'

import { LOGIN_URL } from '@/config/index.ts'

import router from '@/routers/index'

export async function initDynamicRouter() {
  const authStore = useAuthStore()

  try {
    // 1、获取菜单列表 && 按钮权限列表 && 递归菜单数据
    await authStore.listRouters()

    console.log('authStore.flattenMenuList', authStore.flattenMenuList)

    // 2、判断当前用户是否拥有菜单权限
    if (!authStore.flattenMenuList.length) {
      noticeWarning('当前账号无任何菜单权限，请联系系统管理员')
      authStore.setToken('')
      router.replace(LOGIN_URL)
      return
    }

    // 3、添加动态路由[扁平化一级路由数据]
    // 缺点的话应该是三级路由的path要写完整的不能简写去掉/开头
    authStore.flattenMenuList.forEach((item) => {
      router.addRoute('layout', item as RouteRecordRaw)
    })

    // 4.添加错误路由
    router.addRoute(errorRoute)
  }
  catch (error) {
    console.log(error)
    // 当菜单请求出错时，重定向到登陆页
    authStore.setToken('')
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}
