import { RouteTypeEnum } from '@/constants/system'
import type {
  BackendRoute,
  FrontendFlatRoute,
  FrontendRecursionRoute,
} from '@/typings'

// 递归函数用于生成路由配置，登录的时候也需要调用一次。

export const viewsModule = import.meta.glob('@/views/**/*.{vue,tsx}')

function convert2FrontRoute(route: BackendRoute) {
  const retRoute: FrontendFlatRoute = {
    id: route.id,
    path: route.path,
    name: route.name,
    meta: {
      type: route.type,
      parentId: route.parentId,
      title: route.description,
      icon: route.icon,
      localIcon: route.localIcon,
      isShow: route.show,
      isKeepAlive: route.isKeepAlive,
      link: route.link,
      isAffix: route.affixTag,
      isBreadCrumb: route.breadCrumb,
      alwaysShow: route.alwaysShow,
      buttons: [],
    },
  }
  if (route.redirect)
    retRoute.redirect = route.redirect

  if (route.type === RouteTypeEnum.PAGE) {
    retRoute.component = route.component
      ? viewsModule[route.component]
      : () => import('@/views/error/404.vue')
  }

  return retRoute
}

/**
 * 初始化动态路由[用于生成扁平化路由，将后端路由数据转化为前端格式]
 */
export function generateFlattenRoutes(routes: BackendRoute[], filterButton = true) {
  const flatten = routes.map(item => convert2FrontRoute(item))
  if (filterButton)
    return flatten.filter(item => item.meta.type !== RouteTypeEnum.BUTTON)

  return flatten
}

/**
 * 生成树路由,用于前端展示菜单
 */
export function generateTreeRoutes(routes: BackendRoute[]) {
  const frontRoutes = generateFlattenRoutes(routes, false)

  const routeMap: { [key: string]: FrontendRecursionRoute } = {}
  const routeList: FrontendRecursionRoute[] = []

  // 创建映射表，将每个路由对象以其ID为键存储起来
  frontRoutes.forEach((route) => {
    routeMap[route.id] = route
  })

  // 遍历路由数组，将每个路由对象添加到其父级路由对象的 children 数组中
  frontRoutes.forEach((route) => {
    // 没有父级路由对象的视为顶层菜单，添加到 routeList 中
    if (!route.meta.parentId || route.meta.parentId === '0') {
      routeList.push(route)
    }
    else {
      const parent = routeMap[route.meta.parentId]
      if (parent) {
        if (!parent.children)
          parent.children = []
        parent.children.push(route)
      }
    }
  })

  frontRoutes.forEach((route: FrontendRecursionRoute) => {
    if (route.children) {
      route.meta.buttons = route.children
        .filter(item => item.meta.type === RouteTypeEnum.BUTTON && item.meta.button)
        .map(item => item.meta.button!)

      if (route.meta.buttons)
        route.children = route.children.filter(item => item.meta.type !== RouteTypeEnum.BUTTON)
    }
  })

  // alwaysShow
  frontRoutes.forEach((route: FrontendRecursionRoute) => {
    if (route.meta.alwaysShow && route.children?.length === 1)
      route = route.children[0]
  })

  return routeList
}

/**
 * 生成树路由,用于编辑菜单路由和分配权限
 */
export function generateTreeRoutesForEdit(
  routes: BackendRoute[],
) {
  const routeMap: { [key: string]: BackendRoute } = {}
  const routeList: BackendRoute[] = []

  // 创建映射表，将每个路由对象以其ID为键存储起来
  routes.forEach((route) => {
    routeMap[route.id] = route
  })

  // 遍历路由数组，将每个路由对象添加到其父级路由对象的 children 数组中
  routes.forEach((route) => {
    // 没有父级路由对象的视为顶层菜单，添加到 routeList 中
    if (!route.parentId || route.parentId === '0') {
      routeList.push(route)
    }
    else {
      const parent = routeMap[route.parentId]
      if (parent) {
        if (!parent.children)
          parent.children = []
        parent.children.push(route)
      }
    }
  })

  return routeList
}

export function parseStaticRoutes(list: FrontendRecursionRoute[]) {
  return list.filter((item) => {
    const { isShow, type = RouteTypeEnum.PAGE } = item.meta
    // 过滤掉按钮和不可见的
    return type !== RouteTypeEnum.BUTTON && isShow !== false
  }).map((item) => {
    if (!item.children)
      return item

    // 子节点也过滤
    item.children = parseStaticRoutes(item.children)

    // 处理alwaysShow
    if (item.meta.alwaysShow && item.children?.length === 1)
      return item.children[0]

    return item
  })
}
