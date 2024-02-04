<script setup lang="ts">
import settings from '@/config/settings.ts'
import Logo from '@/layouts/components/Logo/index.vue'
import Header from '@/layouts/components/Header/index.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import Main from '@/layouts/components/Main/index.vue'
import { useAuthStore } from '@/stores/modules/auth.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
console.log('纵向布局左侧动态路由', authStore.showMenuList)
// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate)
const menuList = computed(() => authStore.showMenuList)

const menuHoverCollapse = ref(settings.asideMenuHoverCollapse)
</script>

<template>
  <el-container class="layout-container">
    <el-aside
      class="layout-aside transition-all"
      :style="{
        width: !globalStore.isCollapse
          ? `${globalStore.menuWidth}px`
          : settings.asideMenuCollapseWidth,
      }"
    >
      <Logo
        :is-collapse="globalStore.isCollapse"
        :layout="globalStore.layout"
      />
      <el-scrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <el-menu
          :default-active="route.path"
          :collapse="globalStore.isCollapse"
          :collapse-transition="false"
          :unique-opened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <SubMenu :menu-list="menuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .layout-aside {
    z-index: $layout-aside-z-index; // 左侧菜单层级
    padding-right: $aside-menu-padding-right; // 左侧布局右边距（用于悬浮和选中更明显）
    padding-left: $aside-menu-padding-left; // 左侧布局左边距（用于悬浮和选中更明显）
    background-color: var(--el-menu-bg-color);
    border-right: none;
    box-shadow: $aside-menu-box-shadow; // 左侧布局右边框阴影
  }
  .layout-header {
    height: $aside-header-height;
    background-color: var(--el-header-bg-color);
  }
  .layout-main {
    box-sizing: border-box;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}

// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
</style>

<style lang="scss">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: v-bind(menuHoverCollapse) !important;
}
</style>
