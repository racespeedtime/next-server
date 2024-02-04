<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Maximize from '@/layouts/components/Main/components/Maximize.vue'
import Tabs from '@/layouts/components/Tabs/index.vue'
import { useKeepAliveStore } from '@/stores/modules/keepAlive.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'

const globalStore = useGlobalStore()
// 路由动画
const { transition } = storeToRefs(globalStore)

const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore)

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)

// 刷新所有路由页面缓存
const flag = ref(true)
// 监听仓库内部数据是否发生变化，重载缓存路由。
watch(
  () => keepAliveStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)

// 监听当前页面是否最大化，动态添加 class
watch(
  () => globalStore.maximize,
  () => {
    const app = document.getElementById('app') as HTMLElement
    if (globalStore.maximize)
      app.classList.add('main-maximize')
    else app.classList.remove('main-maximize')
    // 浏览器没有实际变化的情况下，触发一次浏览器尺寸变化的逻辑。保证全屏切换的时候，表格阔以进行自适应。
    const event = new Event('resize')
    window.dispatchEvent(event)
  },
  { immediate: true },
)

/** 监听窗口大小变化，折叠侧边栏 */
const screenWidth = ref(0)
const showTabs = ref(true)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (!globalStore.isCollapse && screenWidth.value < 1200)
    globalStore.setGlobalState('isCollapse', true)
  if (globalStore.isCollapse && screenWidth.value > 1200)
    globalStore.setGlobalState('isCollapse', false)
  if (screenWidth.value < 520)
    showTabs.value = false
  else showTabs.value = true
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<template>
  <Maximize v-show="globalStore.maximize" />
  <Tabs v-if="showTabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition :name="transition" mode="out-in" appear>
        <keep-alive v-if="flag" :max="16" :include="keepAliveName">
          <component
            :is="Component"
            v-if="isRouterShow"
            :key="route.fullPath"
            class="bg-#fff dark:bg-black"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
@import "../../../styles/transition.scss";
</style>
