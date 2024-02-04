<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import { useAuthStore } from '@/stores/modules/auth.ts'
import type { FrontendFlatRoute } from '@/typings'

const router = useRouter()
const authStore = useAuthStore()
const menuList = computed(() =>
  authStore.flattenMenuList.filter(
    item => item.meta.isShow !== false, // && item.meta.parentId
  ),
)

// 过滤数据
function searchMenuList(queryString: string, callBack: Function) {
  const results = queryString
    ? menuList.value.filter(filterNodeMethod(queryString))
    : menuList.value
  callBack(results)
}

// 打开搜索框
const isShowSearch = ref(false)
const menuRef = ref()
const searchMenu = ref('')
function handleMenuOpen() {
  isShowSearch.value = true
  nextTick(() => {
    setTimeout(() => {
      menuRef.value.focus()
    })
  })
}

// 搜索窗关闭
function handleCloseSearch() {
  isShowSearch.value = false
}

// 筛选菜单
function filterNodeMethod(queryString: string) {
  return (restaurant: FrontendFlatRoute) => {
    return (
      (restaurant.path
      && restaurant.path.toLowerCase().includes(queryString.toLowerCase()))
      || (restaurant.meta.title
      && restaurant.meta.title.toLowerCase().includes(queryString.toLowerCase()))
    )
  }
}

// 点击菜单跳转
function handleClickMenu(menuItem: any | Record<string, any>) {
  searchMenu.value = ''
  handleCloseSearch()
  if (menuItem.meta.link)
    window.open(menuItem.meta.link, '_blank')
  else router.push(menuItem.path)
}
</script>

<template>
  <!-- 搜索菜单 -->
  <el-tooltip content="搜索菜单">
    <div class="menu-search-dialog">
      <el-icon class="icon m-r-18px" :size="20" @click="handleMenuOpen">
        <Search />
      </el-icon>
      <el-dialog
        v-model="isShowSearch"
        destroy-on-close
        :modal="false"
        :show-close="false"
        fullscreen
        @click="handleCloseSearch"
      >
        <el-autocomplete
          ref="menuRef"
          v-model="searchMenu"
          value-key="path"
          placeholder="菜单搜索：支持菜单名称、路径"
          :fetch-suggestions="searchMenuList"
          @select="handleClickMenu"
          @click.stop
        >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span> {{ item.meta.title }} </span>
          </template>
        </el-autocomplete>
      </el-dialog>
    </div>
  </el-tooltip>
</template>

<style scoped lang="scss">
.menu-search-dialog {
  display: flex;
  align-items: center;
  :deep(.el-dialog) {
    background-color: rgb(0 0 0 / 50%);
    border-radius: 0 !important;
    box-shadow: unset !important;
    .el-dialog__header {
      border-bottom: none !important;
    }
  }
  :deep(.el-autocomplete) {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 550px;
    max-width: 80%;
    transform: translateX(-50%);
    .el-input__wrapper {
      background-color: var(--el-bg-color);
    }
  }
}
.el-autocomplete__popper {
  .el-icon {
    position: relative;
    top: 2px;
    font-size: 16px;
  }
  span {
    margin: 0 0 0 10px;
    font-size: 14px;
  }
}
</style>
