<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { useTagsViewStore } from '~/modules/stores/modules/tags-view'

@Component({
  name: 'AppMain',
})
export default class AppMain extends Vue {
  get cachedViews() {
    return useTagsViewStore().cachedViews
  }

  get key() {
    return this.$route.path
  }
}
</script>

<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <!--<router-view :key="key" v-slot="{ Component }">-->
    <!--  <keep-alive :include="cachedViews">-->
    <!--    <component :is="Component" />-->
    <!--  </keep-alive>-->
    <!--</router-view>-->
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
