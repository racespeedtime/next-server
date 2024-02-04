<script setup lang="ts">
import { useKeepAliveStore } from '@/stores/modules/keepAlive'
import { msgSuccess } from '@/utils/msgNotice'

const keepAliveStore = useKeepAliveStore()
// 刷新路由
function handleRefresh() {
  keepAliveStore.refresh = !keepAliveStore.refresh
  msgSuccess('刷新所有路由页面缓存成功')
}
</script>

<template>
  <!-- 刷新 -->
  <el-tooltip content="刷新缓存">
    <el-icon class="icon m-r-18px" :size="20" @click="handleRefresh">
      <RefreshRight />
    </el-icon>
  </el-tooltip>
</template>
