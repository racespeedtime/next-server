<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { userApi } from '@/api'

interface UserSelectorProps {
  pageSize?: number
  modelValue: string
}

interface ListItem {
  value: string
  label: string
}

const props = withDefaults(defineProps<UserSelectorProps>(), { pageSize: 30 })

const emit = defineEmits(['update:modelValue'])

const vModel = useVModel(props, 'modelValue', emit)

const loading = ref(false)

const options = ref<ListItem[]>([])

async function remoteMethod(query?: string) {
  try {
    loading.value = true
    const { list } = await userApi.listPage({
      username: query,
      pageSize: props.pageSize,
    })
    options.value = list.map((item) => {
      return {
        value: item.id,
        label: item.username,
      }
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <el-select
    v-model="vModel"
    filterable
    remote
    clearable
    :remote-method="remoteMethod"
    :loading="loading"
    v-bind="$attrs"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
