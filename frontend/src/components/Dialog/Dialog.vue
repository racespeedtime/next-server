<script setup lang="ts">
import { debounce } from 'lodash-es'
import { msgBox, msgWarning } from '@/utils/msgNotice'

// 定义参数的类型
interface IDialogProps {
  title?: string
  visible?: boolean
  width?: string | number
  height?: string | number
  confirmText?: string
  cancelText?: string
  destroyOnClose?: boolean
  fullscreen?: boolean
  loading?: boolean
  footerHidden?: boolean // 是否隐藏确认和取消按钮部分
}

const props = withDefaults(defineProps<IDialogProps>(), {
  width: '80%',
  visible: false,
  confirmText: '确定',
  cancelText: '取消',
  destroyOnClose: false,
  fullscreen: false,
  loading: false,
  footerHidden: false,
})

// 当前组件获取父组件传递的事件方法
const emits = defineEmits(['confirm', 'cancel'])

// 开关变量
const visible = ref(false)

// 确定的loading，此处必须用toRefs，否则将失去响应式
const { loading } = toRefs(props)
const confirmLoading = ref(loading)

// 打开弹窗
function open() {
  visible.value = true
}

// 取消
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
// 弹框的取消事件
function cancel() {
  emits('cancel')
}

// 暴露给父组件方法
defineExpose({
  open,
  close,
  quickClose,
})
</script>

<!-- 此弹窗封装将使用 defineExpose，通过ref进行使用 -->
<template>
  <!-- append-to-body 点击空白处不关闭弹窗 -->
  <el-dialog
    :model-value="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    append-to-body
    draggable
    :destroy-on-close="destroyOnClose"
    :before-close="close"
    :fullscreen="fullscreen"
    :loading="loading"
    :footer-hidden="footerHidden"
  >
    <div class="overflow-y-auto" :style="{ maxHeight: height }">
      <!-- 具名插槽 -->
      <slot name="content" />
    </div>
    <template v-if="!footerHidden" #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          loading-icon="Eleme"
          :loading="confirmLoading"
          @click="confirm"
        >{{ confirmText }}</el-button>
        <el-button type="danger" @click="cancel">{{ cancelText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
