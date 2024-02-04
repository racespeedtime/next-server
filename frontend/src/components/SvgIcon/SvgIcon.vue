<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: String,
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: [Number, String],
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const iconStyle = computed(() => {
  if (!props.size)
    return
  const size = typeof props.size === 'string' ? props.size : `${props.size}px`
  return { width: `${size}`, height: `${size}` }
})
</script>

<template>
  <svg :style="iconStyle" aria-hidden>
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
