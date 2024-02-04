/**
 * v-auth
 * 按钮权限指令
 */
import type { Directive, DirectiveBinding } from 'vue'
import type { RouteMetaData } from '@/typings'

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const route = useRoute()

    if (value && Array.isArray(value)) {
      const buttons = (route.meta as RouteMetaData)?.buttons
      if (!buttons)
        return
      const hasPermission = value.every(p => buttons.includes(p))
      if (!hasPermission)
        el.parentNode?.removeChild(el)
    }
  },
}

export default auth
