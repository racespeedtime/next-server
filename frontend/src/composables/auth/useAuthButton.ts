import type { RouteMetaData } from '@/typings'

/**
 * @description 页面按钮权限
 * @example v-if=BUTTONS['btn:add']
 */
export function useAuthButtons() {
  const route = useRoute()
  const authButtons = (route.meta as RouteMetaData)?.buttons || []

  const BUTTONS = computed(() => {
    const currentPageAuthButton: { [key: string]: boolean } = {}
    authButtons.forEach(buttonName => (currentPageAuthButton[buttonName!] = true))
    return currentPageAuthButton
  })

  return {
    BUTTONS,
  }
}
