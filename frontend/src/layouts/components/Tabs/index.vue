<script setup lang="ts">
import Sortable from 'sortablejs'
import type { TabsPaneContext } from 'element-plus'
import { msgWarning } from '@/utils/msgNotice'
import TabMenu from '@/layouts/components/Tabs/components/TabMenu.vue'
import { HOME_URL } from '@/config/index.ts'

import { useTabsStore } from '@/stores/modules/tabs.ts'
import { useAuthStore } from '@/stores/modules/auth.ts'

// 获取当前路由
const route = useRoute()
// 路由跳转
const router = useRouter()
// 获取选项卡仓库
const tabsStore = useTabsStore()
// 获取权限仓库
const authStore = useAuthStore()

// 页面创建后，立即初始化选项卡 AND 拖拽函数
onMounted(() => {
  addTab() // 添加选项卡[进入根页面，立即添加首页]
  setActiveTab() // 设置激活选项卡[进入根页面，立即激活首页]
  initTabs() // 进入根页面，初始化需要固定的页面
  tabsDrop() // 初始化拖拽功能
})

// 监听当前路由，路由path发生变化添加选项卡数据
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull)
      return
    // 2、激活选中的选项卡
    setActiveTab()
    // 3、添加选项卡
    addTab()
  },
)

// 1、初始化需要固定的 tabs[isAffix（配置固定tabs项），在进入系统的时候，获取对应权限菜单数据，如果里面有固定tabs配置项，则进行添加]
function initTabs() {
  authStore.flattenMenuList.forEach((item: any) => {
    if (
      item.meta.isAffix
      && item.meta.isShow !== false
      // && item.meta.isFull == "1"
    ) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: false,
        isKeepAlive: item.meta.isKeepAlive,
      }
      tabsStore.addTab(tabsParams)
    }
  })
}

// 获取选项卡数据
const tabList = computed(() => {
  return tabsStore.getTabs
})

// 2、添加后激活选项卡
const activeTab = ref(route.fullPath)
function setActiveTab() {
  activeTab.value = route.fullPath
}

// 3、添加选项卡
function addTab() {
  // console.log("添加选项卡", route.path, route.meta.isAffix);
  // 解构路由数据
  const { meta, fullPath } = route
  // 构造选项卡数据
  const tab = {
    icon: meta.icon,
    title: meta.title as string,
    path: fullPath,
    name: route.name as string,
    close: !route.meta.isAffix, // true则显示关闭图标
    isKeepAlive: route.meta.isKeepAlive,
  }
  if (fullPath === HOME_URL) {
    // 如果是首页的话，就固定不可关闭。
    tab.close = false
  }
  // 添加到选项卡仓库里面
  tabsStore.addTab(tab)
}

// 4、移除选项卡
function removeTab(fullPath: any) {
  // 最后一个选项卡不被允许关闭
  const ObjectNumber = tabsStore.tabList.filter(
    (item: any) => typeof item === 'object',
  ).length
  if (ObjectNumber === 1) {
    msgWarning('到我的底线了，哼')
    return
  }
  tabsStore.removeTab(fullPath as string, fullPath === route.fullPath)
}

// 5、点击切换选项卡
function clickToggleTab(tab: TabsPaneContext) {
  const { props } = tab
  // console.log(props.name); // 打印路由path
  // 将切换的选项卡进行添加路由操作
  router.push({ path: props.name as string })
}

// 6、tabs 拖拽排序
function tabsDrop() {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item',
    animation: 300,

    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabsStore.tabList]
      // 获取当前移动的索引的数据
      const currentRow = tabsList.splice(oldIndex as number, 1)[0]
      // 将 currentRow 元素插入到 tabsList 数组的指定位置 newIndex。0 是删除的元素数量，这里不需要删除任何元素
      tabsList.splice(newIndex as number, 0, currentRow)
      // 更新排序后的tabs仓库数据
      tabsStore.setTab(tabsList)
    },
  })
}

// 7、右键菜单
const tabMenuRef = ref()
function handleTabsMenuParent(item, value) {
  if (tabMenuRef.value)
    tabMenuRef.value.handleTabsMenu(item, value)
  else msgWarning('右键获取属性失败，请刷新页面重试')
}
</script>

<!-- @tab-remove="removeTab" -->

<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    @tab-click="clickToggleTab"
  >
    <!-- :closable="true" 显示关闭图标 -->
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
      <!-- 加载图标 -->
      <template #label>
        <div class=" flex items-center px-10px h-full gap-x-4px " @contextmenu.prevent="handleTabsMenuParent(item, $event)">
          <IconRender :size="16" class="m-r-2px" :icon="item.icon" :local="item.localIcon" />
          <span>{{ item.title }}</span>
          <el-icon v-if="item.close" :size="14" @click.stop="removeTab(item.path)">
            <Close />
          </el-icon>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
  <TabMenu ref="tabMenuRef" />
</template>

<style lang="scss" scoped>
/** tabs选项卡的css开始 */

:deep(.el-tabs__item:first-child) {
  margin-left: 16px;
}
:deep(.el-tabs__item:nth-child(n)) {
  // 选中/未选中边框
  border: 1px solid #e0e0e6 !important;
}
:deep(.el-tabs__item:not(:active)) {
  // 设置未选中的边框
  border: 1px solid #e0e0e6;
}
:deep(.el-tabs__item) {
  padding: 0 !important;
  height: 28px;
  // margin-top: 1px;
  margin-left: 6px;
  // // font-weight: 600;
  // text-align: center;
  border: 1px solid #e0e0e6;
  border-radius: 4px;
  .is-top {
    border-bottom: none !important;
  }

  // 设置鼠标悬停时的样式
  &:hover {
    // color: $main-tabs-hover-color;
    // tab字体悬浮明亮模式（黑色），暗黑模式（蓝色）
    // color: v-bind(tabsHoverFontColor);
    background: var(--el-color-primary-light-9);
    border: none;
  }

  // 设置鼠标选中的样式（可用来定制不同配色的主题）
  &.is-active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);

    // 边框选中颜色
    border: 1px solid var(--el-color-primary) !important;
  }
}
:deep(.el-tabs__header) {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 0;
  border-top: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
  border-bottom: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
}
// :deep(.el-tabs__nav.is-top) {
//   // height: 32px; // 高度越高，可以调整tab卡距离底部的高度
//   // border: none; //  去除左侧tabs边框
//   // border-radius: 4px;
// }

// 覆盖多余边框
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__nav-prev) {
  // 标签页多了左侧图标
  line-height: 30px;
}
:deep(.el-tabs__nav-next) {
  // 标签页多了右侧图标
  line-height: 30px;
}
// .el-tabs--card {
//   height: 40px !important;
// }

/** tabs选项卡的css结束 */
</style>
