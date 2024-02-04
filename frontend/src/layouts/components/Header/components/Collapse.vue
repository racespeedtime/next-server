<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global.ts'
const globalStore = useGlobalStore()
// 切换图标
function changeCollapseIcon() {
  // 定义图标切换变量(true-折叠，false-展开)
  globalStore.isCollapse = globalStore.setCollapse(globalStore.isCollapse)
}
</script>

<template>
  <el-icon
    class="mr-12px"
    :size="20"
    @click="changeCollapseIcon"
  >
    <SvgIcon
      :name="globalStore.isCollapse ? 'menu-right' : 'menu-left'"
      :size="20"
    />
  </el-icon>
</template>
