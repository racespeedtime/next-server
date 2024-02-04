<script setup lang="ts">
import * as ElIcons from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'
import { ElDivider } from 'element-plus'

interface SelectIconProps {
  modelValue: string
  title?: string
  clearable?: boolean
  placeholder?: string
  local?: boolean
}

const props = withDefaults(defineProps<SelectIconProps>(), {
  modelValue: '',
  title: '请选择图标',
  clearable: true,
  placeholder: '请选择图标',
  local: false,
})

// 选择图标(触发更新父组件数据)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:local': [value: boolean]
}>()

const localIconsModule = import.meta.glob('../../assets/icons/*.svg')

const localIcons = Object.keys(localIconsModule).map((iconPath) => {
  return iconPath.split('assets/icons/')[1].split('.svg')[0]
})

// 清空图标
const inputRef = ref()

const innerValueIcon = useVModel(props, 'modelValue', emit)

// open Dialog
const dialogVisible = ref(false)
const openDialog = () => (dialogVisible.value = true)

function selectIcon(name: string, isLocal: boolean) {
  dialogVisible.value = false
  emit('update:modelValue', name)
  emit('update:local', isLocal)
  setTimeout(() => inputRef.value.blur(), 0)
}

function clearIcon() {
  emit('update:modelValue', '')
  setTimeout(() => inputRef.value.blur(), 0)
}

// 监听搜索框值
const inputValue = ref('')
const customIcons: { [key: string]: any } = ElIcons

const searchLocalIconList = computed(() => {
  if (!inputValue.value)
    return localIcons

  return localIcons.filter(iconName => iconName.includes(inputValue.value))
})

const searchElIconList = computed((): { [key: string]: any } => {
  if (!inputValue.value)
    return ElIcons
  const result: { [key: string]: any } = {}
  for (const key in customIcons) {
    if (key.toLowerCase().includes(inputValue.value.toLowerCase()))
      result[key] = customIcons[key]
  }

  return result
})
</script>

<template>
  <el-input
    ref="inputRef"
    v-bind="$attrs"
    v-model="innerValueIcon"
    :placeholder="placeholder"
    :clearable="clearable"
    @clear="clearIcon"
    @click="openDialog"
  >
    <template #prepend>
      <el-button @click.stop="openDialog">
        <IconRender :icon="modelValue" :local="local" />
      </el-button>
    </template>
  </el-input>
  <el-dialog v-model="dialogVisible" draggable :title="placeholder" width="80%" append-to-body>
    <el-input v-model="inputValue" class="mb-20px" placeholder="搜索图标" size="large" prefix-icon="Search" />
    <el-scrollbar>
      <div class="max-h-60vh">
        <ElDivider
          content-position="left"
        >
          本地图标
        </ElDivider>
        <div v-if="searchLocalIconList.length" class="icon-list">
          <div v-for="item in searchLocalIconList" :key="item" class="icon-item" @click="selectIcon(item, true)">
            <SvgIcon :name="item" :size="30" />
            <span>{{ item }}</span>
          </div>
        </div>
        <el-empty v-else :image-size="60" description="未找到图标" />

        <ElDivider
          content-position="left"
        >
          组件库图标
        </ElDivider>

        <div v-if="Object.keys(searchElIconList).length" class="icon-list">
          <div v-for="item in searchElIconList" :key="item" class="icon-item" @click="selectIcon(item.name, false)">
            <component :is="item" class="w-30px h-30px" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <el-empty v-else :image-size="60" description="未找到图标" />
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<style  scoped>
.icon-list {
  @apply grid gap-x-12px gap-y-20px grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-20px;
}
.icon-item {
  @apply flex flex-col items-center hover:scale-120 transition;
}
</style>
