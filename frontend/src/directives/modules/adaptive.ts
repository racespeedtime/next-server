import type { Directive, DirectiveBinding } from 'vue'

// 自适应表格高度
interface ExHTMLElement extends HTMLElement {
  resizeListener: EventListener
}
// 初始设置表格高度
function setTableHeight(el: ExHTMLElement, binding: DirectiveBinding) {
  const top = el.offsetTop
  const bottom
    = binding.value && typeof binding.value.bottom !== 'undefined'
      ? binding.value.bottom
      : 80
  const pageHeight = window.innerHeight
  el.style.height = `${pageHeight - top - bottom}px`
  el.style.overflowY = 'auto'
}

const resizeDirective: Directive<ExHTMLElement> = {
  mounted(el, binding) {
    if (binding.value === false)
      return
    el.resizeListener = () => {
      requestAnimationFrame(() => {
        setTableHeight(el, binding)
      })
    }

    setTableHeight(el, binding)
    // 监听窗口大小变化事件
    window.addEventListener('resize', el.resizeListener)
  },
  unmounted(el) {
    window.removeEventListener('resize', el.resizeListener)
  },
  updated(el, binding) {
    if (binding.value === false)
      return
    // 确保更新后重新设置表格高度
    requestAnimationFrame(() => {
      setTableHeight(el, binding)
    })
  },
}

export default resizeDirective
