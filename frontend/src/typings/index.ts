import type { RouteRecordRaw } from 'vue-router'
import type { RouteTypeEnum } from '@/constants/system'

export interface CommonRoute {
  path: string
  name?: string
  redirect?: string
}

// 后端路由表实体
export interface BackendRoute extends CommonRoute {
  id: string | number
  type: RouteTypeEnum
  parentId?: string | number | null
  description?: string
  icon?: string
  show?: boolean
  isKeepAlive?: boolean
  link?: string
  affixTag?: boolean
  breadCrumb?: boolean
  component?: string
  alwaysShow?: boolean
  children?: BackendRoute[]
  button?: string
  localIcon?: boolean
}

// 前端定义的路由实体类型，可以清晰的看到前端的字段对应的后端的哪个字段
export interface RouteMetaData {
  type?: BackendRoute['type']
  parentId?: BackendRoute['parentId']
  title?: BackendRoute['description']
  icon?: BackendRoute['icon']
  localIcon?: BackendRoute['localIcon']
  isShow?: BackendRoute['show']
  isKeepAlive?: BackendRoute['isKeepAlive']
  link?: BackendRoute['link']
  isAffix?: BackendRoute['affixTag']
  isBreadCrumb?: BackendRoute['breadCrumb']
  buttons?: BackendRoute['button'][]
  button?: BackendRoute['button']
  alwaysShow?: BackendRoute['alwaysShow']
}

export interface FrontendFlatRoute extends CommonRoute {
  id: BackendRoute['id']
  component?: RouteRecordRaw['component']
  meta: RouteMetaData
}

export interface FrontendRecursionRoute extends CommonRoute {
  component?: RouteRecordRaw['component']
  meta: RouteMetaData
  children?: FrontendRecursionRoute[]
}
