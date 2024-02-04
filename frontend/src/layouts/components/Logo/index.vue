<script setup lang="ts">
import settings from '@/config/settings'
import { useGlobalStore } from '@/stores/modules/global.ts'

const props = defineProps({
  isCollapse: {
    require: false, // true显示，false隐藏
    type: Boolean,
  },
  layout: {
    require: 'vertical', // 布局模式 (纵向：vertical | 分栏：columns | 经典：classic | 横向：horizontal )
    type: String,
  },
})

const globalStore = useGlobalStore()

const title = import.meta.env.VITE_WEB_TITLE
const titleAnimate = settings.logoTitleAnimate

const isClassicOrHorizontal = computed(() => {
  return globalStore.layout === 'classic' || globalStore.layout === 'horizontal'
})

const logoWidth = computed(() => {
  if (isClassicOrHorizontal.value)
    return `${globalStore.menuWidth}px`
  return '100%'
})
</script>

<template>
  <div class="logo-wrapper" :style="{ padding: isClassicOrHorizontal ? '' : '0 8px' }">
    <img
      class="logoImg"
      src="@/assets/images/logo.svg"
      alt="logo"
      :class="titleAnimate"
    >
    <span
      v-show="!props.isCollapse"
      class="ml-8px text-18px font-bold max-w-140 truncate"
      :class="titleAnimate"
      v-text="title"
    />
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(logoWidth);
  box-sizing: border-box;
  height: $aside-header-height;
  line-height: $aside-header-height;
  text-align: center;
  cursor: pointer;
}
.logoImg {
  @apply w-34px h-34px select-none ;
}
</style>
