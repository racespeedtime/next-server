<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  color?: string
  size?: number
  local?: boolean
}>(), {
  size: 18,
})
</script>

<template>
  <template v-if="icon">
    <el-icon :color="color" :size="size">
      <SvgIcon v-if="local" :name="icon" />
      <component :is="icon" v-else />
    </el-icon>
  </template>
</template>
