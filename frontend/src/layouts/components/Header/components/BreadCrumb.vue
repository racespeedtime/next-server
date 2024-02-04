<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { HOME_URL } from '@/config'
import { useAuthStore } from '@/stores/modules/auth'
import type { FrontendRecursionRoute } from '@/typings'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.getBreadcrumbList[route.matched[route.matched.length - 1].path] ?? []
  breadcrumbData = [{ path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } }, ...breadcrumbData]
  return breadcrumbData
})

function onBreadcrumbClick(item: FrontendRecursionRoute, index: number) {
  if (index !== breadcrumbList.value.length - 1)
    router.push(item.path)
}
</script>

<template>
  <div class="breadcrumb-box mask-image">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon v-if="item.meta.icon " class="breadcrumb-icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.mask-image {
  padding-right: 50px;
  mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
}

.breadcrumb-enter-active {
  transition: all 0.3s ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .item-no-icon {
        transform: translateY(-3px);
      }
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
  }
}
.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 4px;
      }
      .item-no-icon {
        transform: translateY(0);
      }
    }
  }
}
</style>
