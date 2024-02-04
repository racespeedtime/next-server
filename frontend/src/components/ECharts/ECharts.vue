<script setup lang="ts">
import type { ECElementEvent, EChartsType } from 'echarts/core'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { ECOption } from './config'
import echarts from './config'
import { useGlobalStore } from '@/stores/modules/global'
import { useTabsStore } from '@/stores/modules/tabs'

interface Props {
  option: ECOption
  renderer?: 'canvas' | 'svg'
  resize?: boolean
  theme?: object | string
  width?: number | string
  height?: number | string
  onClick?: (event: ECElementEvent) => any
}

const props = withDefaults(defineProps<Props>(), {
  renderer: 'canvas',
  resize: true,
})

const echartsStyle = computed(() => {
  return props.width || props.height
    ? { height: `${props.height}px`, width: `${props.width}px` }
    : { height: '100%', width: '100%' }
})

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>()
const chartInstance = ref<EChartsType>()

function draw() {
  if (chartInstance.value)
    chartInstance.value.setOption(props.option, { notMerge: true })
}

watch(props, () => {
  draw()
})

function handleClick(event: ECElementEvent) {
  return props.onClick && props.onClick(event)
}

function init() {
  if (!chartRef.value)
    return
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)

  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: props.renderer,
      }),
    )
    chartInstance.value.on('click', handleClick)
    draw()
  }
}

function resize() {
  if (chartInstance.value && props.resize)
    chartInstance.value.resize({ animation: { duration: 300 } })
}

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

const globalStore = useGlobalStore()
const tabStore = useTabsStore()
const { maximize, isCollapse } = storeToRefs(globalStore)
const { tabList } = storeToRefs(tabStore)

watch(
  () => [maximize, isCollapse, tabList],
  () => {
    debouncedResize()
  },
  { deep: true },
)

onMounted(() => {
  // nextTick(() => init());
  init()
  window.addEventListener('resize', debouncedResize)
})

onBeforeUnmount(() => {
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})
</script>

<template>
  <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>
