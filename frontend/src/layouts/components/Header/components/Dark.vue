<script setup lang="ts">
import { useTheme } from '@/utils/theme.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'

defineProps({
  size: {
    type: Number,
    default: 22,
  },
})
const globalStore = useGlobalStore()
const { initThemeConfig } = useTheme()

// 暗黑主题和明亮主题切换
async function handleSwitchDark(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  // 画圆
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  if (!document.startViewTransition) {
    /** 明亮和暗黑模式核心逻辑 */
    // 定义图标切换变量(true-月亮，false-太阳)
    globalStore.setGlobalState('isDark', !globalStore.isDark)
    initThemeConfig()
    /** 明亮和暗黑模式核心逻辑 */
    return
  }
  const transition = document.startViewTransition(() => {
    /** 明亮和暗黑模式核心逻辑 */
    // 定义图标切换变量(true-月亮，false-太阳)
    globalStore.setGlobalState('isDark', !globalStore.isDark)
    initThemeConfig()
    /** 明亮和暗黑模式核心逻辑 */
  })
  await transition.ready
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`,
  ]
  document.documentElement.animate(
    {
      clipPath: globalStore.isDark ? clipPath : [...clipPath].reverse(),
    },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: globalStore.isDark
        ? '::view-transition-new(root)'
        : '::view-transition-old(root)',
    },
  )
}
</script>

<template>
  <el-tooltip :content="globalStore.isDark ? '明亮模式' : '暗黑模式'">
    <el-icon class="icon m-r-18px" :size="size" @click="handleSwitchDark">
      <Moon v-show="!globalStore.isDark" />
      <Sunny v-show="globalStore.isDark" />
    </el-icon>
  </el-tooltip>
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
