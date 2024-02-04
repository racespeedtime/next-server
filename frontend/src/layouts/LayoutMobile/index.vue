<script setup lang="ts">
import settings from '@/config/settings.ts'
import Toolbar from '@/layouts/components/Header/components/Toolbar.vue'
import Logo from '@/layouts/components/Logo/index.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import Main from '@/layouts/components/Main/index.vue'
import { useAuthStore } from '@/stores/modules/auth.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate)
const menuList = computed(() => authStore.showMenuList)

const mobileDrawer = ref(false)
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header flex items-center flex-justify-between">
      <div class="w-30px flex items-center">
        <SvgIcon
          name="mobile-menu"
          :size="30"
          @click="mobileDrawer = true"
        />
      </div>
      <Toolbar />
    </el-header>
    <el-container class="layout-main">
      <Main />
    </el-container>
  </el-container>

  <Teleport to="body">
    <div v-if="mobileDrawer" class="fixed inset-0 z-40" @click="mobileDrawer = !mobileDrawer">
      <!-- mask -->
      <div class="absolute inset-0 bg-gray-500 opacity-75" />
    </div>
    <div
      class="fixed z-50 overflow-x-hidden overflow-y-auto bg-white transition-all duration-200 dark:bg-#141414 duration-200 h-full"
      :class="[
        {
          '-left-full top-0': !mobileDrawer,
          'left-0 top-0': mobileDrawer,
        },
      ]"
      :style="{
        width: `${globalStore.menuWidth}px`,
      }"
    >
      <Logo layout="mobile" />
      <el-scrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <el-menu
          :default-active="route.path"
          :collapse-transition="false"
          :unique-opened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <SubMenu :menu-list="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-header {
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
  }
  .layout-main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}
.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
</style>
