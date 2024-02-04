<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <!-- 全屏 -->
  <el-tooltip :content="isFullscreen ? '关闭全屏' : '全屏'">
    <el-icon class="icon m-r-18px" :size="18" @click="toggle">
      <FullScreen v-if="!isFullscreen" />
      <CloseBold v-else />
    </el-icon>
  </el-tooltip>
</template>
