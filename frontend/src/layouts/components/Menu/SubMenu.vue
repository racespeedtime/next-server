<script setup lang="ts">
import { storeToRefs } from 'pinia'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import { useGlobalStore } from '@/stores/modules/global.ts'
import type { FrontendRecursionRoute } from '@/typings'
import { RouteTypeEnum } from '@/constants/system'

defineProps<{
  menuList: FrontendRecursionRoute[]
}>()

const router = useRouter()
const globalStore = useGlobalStore()
const { menuBLSColor } = storeToRefs(globalStore)

// 切换明亮和暗黑主题开关监听
watch(
  () => globalStore.isDark,
  () => {
    menuBLSColor.value = globalStore.setMenuBLSColor()
  },
)
onMounted(() => {
  menuBLSColor.value = globalStore.setMenuBLSColor()
})
/* 打开外部标签页 */
function handleMenuIsLink(value: any) {
  if (value.meta.link)
    return window.open(value.meta.link, '_blank')
  router.push(value.path)
}
</script>

<template>
  <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.meta.type === RouteTypeEnum.MENU" :index="item.path">
      <template #title>
        <IconRender :icon="item.meta.icon" :local="item.meta.localIcon" />
        <span v-text="item.meta?.title" />
      </template>
      <SubMenu :menu-list="item.children || []" />
    </el-sub-menu>
    <!-- 叶子节点（功能节点） -->
    <el-menu-item v-else :index="item.path" @click="handleMenuIsLink(item)">
      <IconRender :icon="item.meta.icon" :local="item.meta.localIcon" />
      <template #title>
        <span v-text="item.meta?.title" />
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss">
/** el-menu鼠标悬停和点击代码 */

/** 第一级父节点下拉框里面悬停和点击 */

.el-menu-item {
  font-weight: $aside-menu-font-weight;
  color: #000000;
  /* 设置用户禁止选中 */
  user-select: none;

  @apply dark:text-#E5E3FA;

  // 设置鼠标悬停时el-menu-item的样式
  &:hover {
    color: var(--el-color-primary) !important;
    background: var(--el-color-primary-light-8) !important;

    // 实现鼠标悬停时icon变色
    i,
    span {
      color: var(--el-color-primary) !important;
    }
  }

  // 设置选中el-menu-item时的样式
  &.is-active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
  }
}

// 子节点
.el-sub-menu__title {
  font-weight: $aside-menu-font-weight;
  color: #000000;
  user-select: none;
  // border-radius: $aside-menu-border-left;

  @apply dark:text-#E5E3FA;

  &:hover,
  &:active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
  }
}

.el-menu--vertical {

  .el-menu-item {
    height: $aside-menu-height !important;
    line-height: $aside-menu-height;
    margin-bottom: $aside-menu-margin-bottom;
    border-left: $aside-menu-border-left solid v-bind(menuBLSColor);

    // 设置选中el-menu-item时的样式
    &:hover,
    &.is-active {
      border-left: $aside-menu-border-left solid var(--el-color-primary);
    }

  }

  // 子节点
  .el-sub-menu__title {
    height: $aside-menu-height;
    line-height: $aside-menu-height;
    padding-right: 0; // 去除collapse缩小多余的边框
    margin-bottom: $aside-menu-margin-bottom;
    border-left: $aside-menu-border-left solid v-bind(menuBLSColor);

    &:hover,
    &:active {
      border-left: $aside-menu-border-left solid var(--el-color-primary);
    }

  }
}

.el-menu--horizontal {
  .el-menu--popup {
    padding: 0;
  }
}
</style>

<style lang="scss">
/* 子级菜单字体高亮，父级菜单也高亮 */
.el-sub-menu.is-active>.el-sub-menu__title {
  color: var(--el-color-primary) !important;
}

/* icon图标也跟着变 */
.el-sub-menu.is-active>.el-sub-menu__title i {
  color: var(--el-color-primary) !important;
}
</style>
