<script setup lang="ts">
// 明亮主题和暗黑主题配色工具类
import { storeToRefs } from 'pinia'
import { useTheme } from '@/utils/theme.ts'
import mittBus from '@/utils/mittBus.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'
import { DEFAULT_THEME } from '@/config'

const globalStore = useGlobalStore()

const { changeThemeColor, changeGrey, setAsideTheme } = useTheme()
const { layout, isCollapse, transition, uniqueOpened, menuWidth, isGrey }
  = storeToRefs(globalStore)

/** 主题设置弹出框 */
const dialogRef = ref()
// 打开主题配置
function handleThemeConfig() {
  dialogRef.value.open()
}

// 布局切换
function setLayout(value: any) {
  globalStore.setGlobalState('layout', value)
  setAsideTheme()
}

// 打开主题配置对话框，on 接收事件
mittBus.on('handleThemeConfig', () => {
  handleThemeConfig()
})
</script>

<template>
  <Dialog
    ref="dialogRef"
    title="设置"
    :footer-hidden="true"
    :close-on-click-modal="true"
  >
    <template #content>
      <div class="flex items-center gap-4px">
        <span>主题颜色选择</span>
        <el-color-picker
          :model-value="globalStore.themeColor"
          @update:model-value="changeThemeColor"
        />
        <el-button @click="() => changeThemeColor(DEFAULT_THEME)">
          恢复默认
        </el-button>
      </div>
      <el-row>
        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <el-divider class="divider" content-position="center">
            <el-icon><Notification /></el-icon>
            布局样式
          </el-divider>
        </el-col>
      </el-row>

      <div class="layout-box">
        <el-tooltip
          effect="dark"
          content="纵向"
          placement="top"
          :show-after="200"
        >
          <div
            class="layout-item layout-vertical"
            :class="[{ 'is-active': layout === 'vertical' }]"
            @click="setLayout('vertical')"
          >
            <div class="layout-dark" />
            <div class="layout-container">
              <div class="layout-light" />
              <div class="layout-content" />
            </div>
            <el-icon v-if="layout === 'vertical'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="分栏"
          placement="top"
          :show-after="200"
        >
          <div
            class="layout-item layout-columns"
            :class="[{ 'is-active': layout === 'columns' }]"
            @click="setLayout('columns')"
          >
            <div class="layout-dark" />
            <div class="layout-light" />
            <div class="layout-content" />
            <el-icon v-if="layout === 'columns'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="经典"
          placement="top"
          :show-after="200"
        >
          <div
            class="layout-item layout-classic"
            :class="[{ 'is-active': layout === 'classic' }]"
            @click="setLayout('classic')"
          >
            <div class="layout-dark" />
            <div class="layout-container">
              <div class="layout-light" />
              <div class="layout-content" />
            </div>
            <el-icon v-if="layout === 'classic'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="横向"
          placement="top"
          :show-after="200"
        >
          <div
            class="layout-item layout-horizontal"
            :class="[{ 'is-active': layout === 'horizontal' }]"
            @click="setLayout('horizontal')"
          >
            <div class="layout-dark" />
            <div class="layout-content" />
            <el-icon v-if="layout === 'horizontal'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>

      <el-form label-width="auto" label-position="left" class="p-t-8px p-l-3px">
        <el-row>
          <el-col :xs="{ span: 24 }" :sm="{ span: 13 }">
            <el-form-item>
              <div class="flex items-center">
                <span class="m-r-2px">路由动画</span>
                <el-tooltip placement="bottom" content="路由加载动画模式">
                  <el-icon class="m-r-10px">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
              <el-select
                v-model="transition"
                placeholder="请选择路由动画"
                clearable
                style="width: 200px"
              >
                <el-option label="默认" value="fade-default" />
                <el-option label="渐变" value="fade" />
                <el-option label="滑动" value="fade-slide" />
                <el-option label="抽屉" value="zoom-fade" />
                <el-option label="底部滑出" value="fade-bottom" />
                <el-option label="缩放消退" value="fade-scale" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 11 }">
            <el-form-item label="折叠菜单">
              <el-form-item>
                <el-switch
                  v-model="isCollapse"
                  active-text="展开"
                  inactive-text="折叠"
                  :active-value="true"
                  :inactive-value="false"
                  :inline-prompt="true"
                />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="{ span: 24 }" :sm="{ span: 13 }">
            <el-form-item>
              <div class="flex items-center">
                <span class="m-r-2px">菜单手风琴</span>
                <el-tooltip
                  placement="bottom"
                  content="左侧菜单是否展开单个子菜单[启用-单个/关闭-多个]"
                >
                  <el-icon class="m-r-10px">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
              <el-switch
                v-model="uniqueOpened"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="{ span: 24 }" :sm="{ span: 11 }">
            <el-form-item label="菜单宽度">
              <el-input-number
                v-model="menuWidth"
                :min="210"
                :max="260"
                :step="2"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="{ span: 24 }" :sm="{ span: 12 }">
            <el-form-item label="灰色模式">
              <el-switch
                v-model="isGrey"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                @change="changeGrey(!!$event)"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
// 图标颜色
.icon {
  &:hover {
    color: var(--el-color-primary);
    cursor: pointer;
  }
}

/* 选中打钩效果 */
.themeSelected::before {
  position: absolute;
  right: 8px;
  bottom: 22px;
  font-size: 24px;
  content: "";
  transform: scale(0); /* 初始状态下隐藏 */
}
.themeSelected {
  position: relative;
}
.themeSelected::before {
  transform: scale(1); /* 选中状态下显示 */
}

/** 布局css */
.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      width: 14%;
    }
    .layout-light {
      width: 17%;
    }
    .layout-content {
      width: 55%;
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }
  .layout-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 67%;
    }
  }
}
</style>
