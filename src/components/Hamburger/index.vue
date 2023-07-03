<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-facing-decorator'

@Component({
  name: 'Hamburger',
})
export default class Hamburger extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  @Emit('toggle-click')
  private toggleClick() {
    return null
  }
}
</script>

<template>
  <div
    :class="[{ 'is-active': isActive }]"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      size="20"
      style="height: 50px;"
    />
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
