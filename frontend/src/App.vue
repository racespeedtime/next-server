<script setup lang="tsx">
import locale from 'element-plus/dist/locale/zh-cn.mjs'
import { useTheme } from '@/utils/theme.ts'
import { useGlobalStore } from '@/stores/modules/global.ts'

const { dimension } = storeToRefs(useGlobalStore())

const { initThemeConfig } = useTheme()
initThemeConfig()
</script>

<template>
  <el-config-provider :size="dimension" :locale="locale">
    <router-view />
  </el-config-provider>
</template>
