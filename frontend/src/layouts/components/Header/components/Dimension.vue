<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global.ts'
import { msgSuccess } from '@/utils/msgNotice'

const globalStore = useGlobalStore()
const dimension = computed(() => globalStore.dimension)

const dimensionList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' },
]

function handleDimension(item: string) {
  if (dimension.value === item)
    return
  window.location.reload()
  globalStore.setDimension(item)
  msgSuccess('配置成功')
}
</script>

<template>
  <el-tooltip placement="left" content="尺寸配置">
    <el-dropdown @command="handleDimension">
      <el-icon class="icon m-r-18px" :size="22">
        <ElementPlus />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in dimensionList"
            :key="item.value"
            :command="item.value"
            :disabled="dimension === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>
