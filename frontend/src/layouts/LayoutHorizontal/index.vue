<script setup lang="ts">
import settings from '@/config/settings.ts'
import Logo from '@/layouts/components/Logo/index.vue'
import Toolbar from '@/layouts/components/Header/components/Toolbar.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import Main from '@/layouts/components/Main/index.vue'
import { useAuthStore } from '@/stores/modules/auth.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'
import { RouteTypeEnum } from '@/constants/system'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

console.log('横向布局左侧动态路由', authStore.showMenuList)
// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate)
const menuList = computed(() => authStore.showMenuList)
/* 打开外部标签页 */
function handleMenuIsLink(value: any) {
  if (value.meta?.link)
    return window.open(value.meta.link, '_blank')
  router.push(value.path)
}
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Logo :layout="globalStore.layout" />
      <div class="menu">
        <!-- 不能直接使用 HorizontalSubMenu 组件，因为菜单数据过多无法触发 el-menu 隐藏省略功能 -->
        <el-menu
          mode="horizontal"
          :default-active="route.path"
          :router="false"
          :class="menuAnimate"
        >
          <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
          <template v-for="item in menuList" :key="item.path">
            <!-- 非叶子节点 v-show：true(显示)false(隐藏)，v-if反之。 -->
            <el-sub-menu v-if="item.meta.type === RouteTypeEnum.MENU" :index="item.path">
              <template #title>
                <IconRender
                  :icon="item.meta.icon" :local="item.meta.localIcon"
                />
                <span v-text="item.meta?.title" />
              </template>
              <SubMenu :menu-list="item.children || []" />
            </el-sub-menu>
            <!-- 叶子节点（功能节点） -->
            <el-menu-item
              v-else
              :index="item.path"
              @click="handleMenuIsLink(item)"
            >
              <IconRender
                :icon="item.meta.icon" :local="item.meta.localIcon"
              />
              <template #title>
                <span v-text="item.meta?.title" />
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>

      <Toolbar />
    </el-header>
    <Main />
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
    .menu {
      flex: 1;
    }
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
</style>
