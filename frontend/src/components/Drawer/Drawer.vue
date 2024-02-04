<script setup lang="ts">
import { ref, toRefs } from 'vue'

import { debounce } from 'lodash-es'
import { msgBox, msgWarning } from '@/utils/msgNotice'

// 定义参数的类型
interface IDrawerProps {
  title?: string
  visible?: boolean
  size?: string
  destroyOnClose?: boolean
  closeOnClickModel?: boolean
  confirmText?: string
  cancelText?: string
  direction?: any
  loading?: boolean
  footerHidden?: boolean // 是否隐藏确认和取消按钮部分
}

const props = withDefaults(defineProps<IDrawerProps>(), {
  visible: false,
  size: '450',
  closeOnClickModel: false,
  destroyOnClose: false,
  confirmText: '确定',
  cancelText: '取消',
  direction: 'rtl',
  loading: false,
  footerHidden: false,
})

// 当前组件获取父组件传递的事件方法，然后点击确认和提交是触发父组件传递过来的事件
const emits = defineEmits(['confirm', 'cancel'])
// 开关变量
const visible = ref(false)
// 确定的loading，此处必须用toRefs，否则将失去响应式
const { loading } = toRefs(props)
const confirmLoading = ref(loading)

// 打开抽屉
function open() {
  visible.value = true
}

// 关闭抽屉
function close() {
  msgBox('您确认进行关闭么？')
    .then(() => {
      visible.value = false
      msgWarning('已关闭')
    })
    .catch(() => {
      // 用户点击了取消按钮或关闭确认框
      // 执行取消操作或不做任何操作
      msgWarning('已取消')
    })
}

// 确认提交后关闭弹窗
function quickClose() {
  visible.value = false
}

// 弹框的确定事件
const confirm = debounce(() => {
  emits('confirm')
}, 200)

// 关闭抽屉
function cancel() {
  emits('cancel')
}

// defineExpose是vue3新增的一个api，放在<script setup>下使用的，
// 目的是把属性和方法暴露出去，可以用于父子组件通信，子组件把属性暴露出去，
// 父组件用ref获取子组件DOM，子组件暴露的方法或属性可以用dom获取。
defineExpose({
  open,
  close,
  quickClose,
})
</script>

<template>
  <div>
    <el-drawer
      v-model="visible"
      :title="title"
      :size="size"
      :direction="direction"
      :close-on-click-modal="closeOnClickModel"
      :destroy-on-close="destroyOnClose"
      :before-close="close"
      :loading="loading"
      :footer-hidden="footerHidden"
    >
      <div class="formDrawer">
        <div class="body">
          <slot name="content" />
        </div>
        <div v-if="!footerHidden" class="footer">
          <el-button
            type="primary"
            loading-icon="Eleme"
            :loading="confirmLoading"
            @click="confirm"
          >
            {{ confirmText }}
          </el-button>
          <el-button type="danger" @click="cancel">
            {{ cancelText }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.formDrawer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .body {
    bottom: 50px;
    flex: 1;
    overflow-y: auto; // 超出部分则滚动
  }
  .footer {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: auto;

    // justify-content: center;
  }
}
:deep(.el-drawer__title) {
  font-weight: 600;

  @apply dark:text-#CFD3DC;
}
</style>
