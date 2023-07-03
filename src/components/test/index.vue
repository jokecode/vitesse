<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'

@Component({})
export default class test extends Vue {
  // 这是一个vue响应式属性
  text = 'Example code'

  // 这是一个vue组件方法
  method() {
    // eslint-disable-next-line no-console
    console.log(this.text)
  }

  // 这是一个vue生命周期钩子
  mounted() {
    this.method()
  }
}
</script>

<template>
  <div>{{text}}</div>
</template>

<style scoped lang="scss">

</style>
