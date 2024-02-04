<script setup lang="ts">
import Collapse from '@/layouts/components/Header/components/Collapse.vue'
import BreadCrumb from '@/layouts/components/Header/components/BreadCrumb.vue'
import Toolbar from '@/layouts/components/Header/components/Toolbar.vue'
</script>

<template>
  <div class="header">
    <div class="header-left">
      <!-- 左侧菜单展开和折叠图标 -->
      <Collapse />
      <!-- 面包屑 -->
      <BreadCrumb class="hidden md:block" />
    </div>
    <Toolbar />
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $aside-header-height;
  .header-left {
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
