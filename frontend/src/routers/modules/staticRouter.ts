import type { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config'
import Layout from '@/layouts/index.vue'
import type { FrontendRecursionRoute } from '@/typings'

export const staticRoutes: FrontendRecursionRoute[] = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: HOME_URL,
    meta: {
      alwaysShow: true,
    },
    children: [
      {
        path: HOME_URL,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', // 标题
          icon: 'HomeFilled', // 图标
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: '404页面',
          icon: 'CircleCloseFilled',
          isShow: false,
        },
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/error/403.vue'),
        meta: {
          title: '403页面',
          icon: 'QuestionFilled',
          isShow: false,
        },
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/error/500.vue'),
        meta: {
          title: '500页面',
          icon: 'WarningFilled',
          isShow: false,
        },
      },
    ],
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      isShow: false,
    },
  },
]

export const errorRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}
