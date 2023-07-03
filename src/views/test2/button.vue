<script setup lang="ts">
import { onMounted, ref } from 'vue'
import vueSvg from '~/assets/svg/vue.svg'
import bugSvg from '~/assets/svg/bug.svg'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="count++">
    Count is: {{ count }}
  </button>
  <button @click="increment">
    Count is: {{ count }}
  </button>

  <h1>===============</h1>
  <el-button>我是 ElButton</el-button>
  <h1>===============</h1>
  <div class="hot-reload">
    9090909009090
  </div>
  <div class="hot-reload">
    9090909009090
  </div>
  <br>
</template>

<style scoped>
.hot-reload {
  color: #E65D6E;
  background-color: yellow;
}
</style>
