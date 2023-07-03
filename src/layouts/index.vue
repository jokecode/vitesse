<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'

// import { Component, mixins } from 'vue-facing-decorator'
import { AppMain, Navbar, Settings, Sidebar, SidebarPlus, TagsView } from './components'

import ResizeMixin from './mixin/resize'
import { DeviceType, useAppStore } from '~/modules/stores/modules/app'
import { useSettingStore } from '~/modules/stores/modules/settings'
import RightPanel from '~/components/RightPanel/index.vue'

@Component({
  name: 'Layout',
  mixins: [ResizeMixin],
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    SidebarPlus,
    TagsView,
  },
})
export default class Layout extends Vue {
  get device() {
    return useAppStore().device
  }

  get sidebar() {
    return useAppStore().sidebar
  }

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    }
  }

  get showSettings() {
    return useSettingStore().showSettings
  }

  get showTagsView() {
    return useSettingStore().showTagsView
  }

  get fixedHeader() {
    return useSettingStore().fixedHeader
  }

  public handleClickOutside() {
    useAppStore().CLOSE_SIDEBAR(false)
  }
}
</script>

<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!--<Sidebar class="sidebar-container" />-->
    <SidebarPlus class="sidebar-container" />
    <div
      :class="{ hasTagsView: showTagsView }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px)
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
