<script lang="ts">
import screenfull from 'screenfull'
import { Component, Vue } from 'vue-facing-decorator'

const sf = screenfull

@Component({
  name: 'Screenfull',
})
export default class Screenfull extends Vue {
  private isFullscreen = false

  mounted() {
    if (sf.isEnabled)
      sf.on('change', this.change)
  }

  beforeDestory() {
    if (sf.isEnabled)
      sf.off('change', this.change)
  }

  private change() {
    if (sf.isEnabled)
      this.isFullscreen = sf.isFullscreen
  }

  private click() {
    if (!sf.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning',
      })
      return false
    }
    sf.toggle()
  }
}
</script>

<template>
  <div id="screenfull">
    <svg-icon
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>
