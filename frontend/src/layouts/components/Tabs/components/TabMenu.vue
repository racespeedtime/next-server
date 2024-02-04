<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'
import { useTabsStore } from '@/stores/modules/tabs.ts'
import { useKeepAliveStore } from '@/stores/modules/keepAlive.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'
import { HOME_URL } from '@/config/index.ts'

const route = useRoute()
const router = useRouter()
const keepAliveStore = useKeepAliveStore()
const tabsStore = useTabsStore()
const globalStore = useGlobalStore()

const dropdownRef = ref<DropdownInstance>()

// 点击鼠标右键点击出现菜单
const chooseItem = ref({} as any)
const choosePath = ref('')

const isHideCloseLeft = computed(() => {
  if (!chooseItem.value.path)
    return false
  const index = tabsStore.tabList.findIndex(item => item.path === chooseItem.value.path)
  if (index === -1)
    return false
  const isLeftCannotClose = tabsStore.tabList.slice(0, index).every(item => !item.close)
  return index === 0 || isLeftCannotClose
})

const isHideCloseRight = computed(() => {
  if (!chooseItem.value.path)
    return false
  const index = tabsStore.tabList.findIndex(item => item.path === chooseItem.value.path)
  if (index === -1)
    return false
  if (index === tabsStore.tabList.length - 1)
    return true
  const isRightCannotClose = tabsStore.tabList.slice(index + 1).every(item => !item.close)
  return isRightCannotClose
})

function handleTabsMenu(item, e: MouseEvent) {
  chooseItem.value = item

  console.log(chooseItem.value)

  choosePath.value = item.path
  const card = document.querySelector('.tabs-card') as HTMLElement | null

  // 阻止默认右键菜单
  e.preventDefault()
  if (card != null) {
    // 设置 card 的位置为鼠标点击位置
    // card.style.display = "block";
    card.style.left = `${e.pageX}px` as string
    card.style.top = `${e.pageY}px` as string

    dropdownRef.value?.handleOpen()

    // 点击数据时，菜单消失
    const hideCard = () => {
      dropdownRef.value?.handleClose()
      // if (card !== null) card.style.display = "none";

      window.removeEventListener('click', hideCard) // 移除点击事件监听器，以免影响其他操作
    }

    window.addEventListener('click', hideCard)
  }
  // 阻止事件冒泡到父元素（防止触发全局的 window.onclick）
  e.stopPropagation()
}

// 刷新当前页
const refreshCurrentPage = inject('refresh') as Function
function handleRefresh() {
  if (route.meta.isKeepAlive)
    keepAliveStore.removeKeepAliveName(route.name as string)

  refreshCurrentPage(false)
  nextTick(() => {
    refreshCurrentPage(true)
  })
}

// 当前页全屏
function handleMaximize() {
  globalStore.setGlobalState('maximize', !globalStore.maximize)
}

// 关闭左边 OR 右边选项卡
function handleCloseSideTabs(direction: any) {
  if (choosePath.value)
    tabsStore.closeSideTabs(choosePath.value, direction)
  else tabsStore.closeSideTabs(route.fullPath, direction)
}

// 关闭当前选项卡
function handleCloseCurrentTab() {
  if (route.meta?.isAffix)
    return
  if (choosePath.value)
    tabsStore.removeTab(choosePath.value)
  else tabsStore.removeTab(route.fullPath)
}

// 关闭其他选项卡
function handleCloseOtherTabs() {
  if (choosePath.value)
    tabsStore.closeManyTabs(choosePath.value)
  else tabsStore.closeManyTabs(route.fullPath)
}

// 关闭全部选项卡
function handleCloseAllTabs() {
  tabsStore.closeManyTabs()
  router.push(HOME_URL)
}

defineExpose({
  handleTabsMenu,
})
</script>

<template>
  <div class="tabs-card">
    <el-dropdown ref="dropdownRef" :teleported="false">
      <div />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleRefresh">
            <el-icon> <Refresh /> </el-icon>刷新
          </el-dropdown-item>
          <el-dropdown-item @click="handleMaximize">
            <el-icon> <FullScreen /> </el-icon>最大化
          </el-dropdown-item>
          <el-dropdown-item v-if="chooseItem.close" :divided="chooseItem.close" @click="handleCloseCurrentTab">
            <el-icon> <Close /> </el-icon>关闭当前
          </el-dropdown-item>
          <el-dropdown-item v-if="!isHideCloseLeft" :divided="!chooseItem.close" @click="handleCloseSideTabs('left')">
            <el-icon> <DArrowLeft /> </el-icon>关闭左侧
          </el-dropdown-item>
          <el-dropdown-item v-if="!isHideCloseRight" :divided="!chooseItem.close" @click="handleCloseSideTabs('right')">
            <el-icon> <DArrowRight /> </el-icon>关闭右侧
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleCloseOtherTabs">
            <el-icon> <Star /> </el-icon>关闭其他
          </el-dropdown-item>
          <el-dropdown-item @click="handleCloseAllTabs">
            <el-icon> <Remove /> </el-icon>全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
/** 右键点击选项开始 */
.tabs-card {
  position: absolute;
}

/** 右键点击选项结束 */
</style>
