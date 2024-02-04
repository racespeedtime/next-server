import type { FrontendRecursionRoute } from '@/typings'

/**
 * @description 生成唯一 uuid
 */
export function generateUUID() {
  let uuid = ''
  for (let i = 0; i < 32; i++) {
    const random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20)
      uuid += '-'
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }
  return uuid
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {object} result 处理后的结果
 */
export function getAllBreadcrumbList(
  menuList: FrontendRecursionRoute[],
  parent: FrontendRecursionRoute[] = [],
  result: { [key: string]: FrontendRecursionRoute[] } = {},
) {
  for (const item of menuList) {
    result[item.path] = [...parent, item]

    if (item.children)
      getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}
