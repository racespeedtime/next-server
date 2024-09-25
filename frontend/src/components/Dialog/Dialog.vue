<script setup lang="ts">
import { debounce } from 'lodash-es'

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
  footerHidden?: boolean
}

withDefaults(defineProps<IDialogProps>(), {
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

const visible = ref(false)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

const confirm = debounce(() => {
  emits('confirm')
}, 200)
function cancel() {
  emits('cancel')
}

defineExpose({ open, close })
</script>

<template>
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
      <slot />
    </div>
    <template v-if="!footerHidden" #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          loading-icon="Eleme"
          :loading="loading"
          @click="confirm"
        >{{ confirmText }}</el-button>
        <el-button type="danger" @click="cancel">{{ cancelText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
