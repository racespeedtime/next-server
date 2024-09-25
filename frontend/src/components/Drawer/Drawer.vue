<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'lodash-es'

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
  footerHidden?: boolean
}

withDefaults(defineProps<IDrawerProps>(), {
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
  <div>
    <el-drawer
      v-model="visible" :title="title" :size="size" :direction="direction"
      :close-on-click-modal="closeOnClickModel" :destroy-on-close="destroyOnClose" :before-close="close"
      :loading="loading" :footer-hidden="footerHidden"
    >
      <div class="formDrawer">
        <div class="body">
          <slot />
        </div>
        <div v-if="!footerHidden" class="footer">
          <el-button type="primary" loading-icon="Eleme" :loading="loading" @click="confirm">
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
