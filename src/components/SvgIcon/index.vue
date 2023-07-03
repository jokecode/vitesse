<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  // 类型检查
  prefix: {
    type: String,
    default: 'icon',
  },
  // 多种可能的类型
  size: {
    type: [String, Number],
    default: 16,
  },
  // color: {
  //   type: String,
  //   default: 'black',
  // },
  // 必传，且为 String 类型
  name: {
    type: String,
    required: true,
  },
})
const iconWidth = computed(() => `${props.size}px`)
const iconHeight = computed(() => `${props.size}px`)
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg :style="{ width: iconWidth, height: iconHeight }" class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
