<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'

// 打开主题配置
function handleThemeDialog() {
  mittBus.emit('handleThemeConfig')
}
</script>

<template>
  <!-- 设置 -->
  <el-tooltip content="主题配置">
    <el-icon class="icon m-r-18px" :size="20" @click="handleThemeDialog">
      <Setting />
    </el-icon>
  </el-tooltip>
</template>
