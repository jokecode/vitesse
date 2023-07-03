<script setup lang="ts">
const text = ref('我是首页 哈哈')
</script>

<template>
  <div class="hot-update">
    <h1>我是首页</h1>
    <h1>我是首页</h1>
    <h2>{{ text }}</h2>
    <h1>我是首页</h1>
    <h1>我是首页</h1>
  </div>
</template>

<style scoped lang="scss">
.hot-update {
  color: black;
  background-color: yellowgreen;
}
</style>
