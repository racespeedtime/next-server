import { ElDialog } from 'element-plus'
import type { App } from 'vue'

interface UseDialogOptions {
  message?: string
  destroyOnClosed?: boolean
  render?: () => JSX.Element | null
  props?: InstanceType<typeof ElDialog>['$props']
  slots?: Record<string, () => JSX.Element | null>
}

export function useDialog(options: UseDialogOptions = {}) {
  const { props = {}, slots = {} } = options

  let mountNode: HTMLElement | null = null

  let instance: App<Element> | null = null

  const show = ref(true)

  function destroy() {
    if (!instance || !mountNode)
      return
    instance.unmount()
    mountNode.remove()
  }

  function create() {
    if (instance)
      destroy()

    mountNode = document.createElement('div')

    instance = createApp({
      render() {
        return h(
          ElDialog,
          {
            ...props,
            'modelValue': show.value,
            'draggable': props.draggable !== undefined ? props.draggable : true,
            'onUpdate:modelValue': function (value) {
              props['onUpdate:modelValue']?.(value)
              show.value = value
            },
            onClosed() {
              props.onClosed?.()
              options.destroyOnClosed && destroy()
            },
          },
          {
            ...slots,
            default: options.render || slots.default || options.message,
          },
        )
      },
    })

    document.body.appendChild(mountNode)
    instance.mount(mountNode)
  }

  onUnmounted(() => {
    console.log('unmounted')
    destroy()
  })

  return { create, destroy, show }
}
