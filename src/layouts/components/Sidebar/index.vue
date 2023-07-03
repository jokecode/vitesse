<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import type { RouteRecordRaw } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { useAppStore } from '~/modules/stores/modules/app'
import { usePermissionStore } from '~/modules/stores/modules/permission'
import { useSettingStore } from '~/modules/stores/modules/settings'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo,
  },
})
export default class SideBar extends Vue {
  get sidebar() {
    return useAppStore().sidebar
  }

  get routes() {
    return usePermissionStore().routes as RouteRecordRaw[]
  }

  get showLogo() {
    return useSettingStore().showSidebarLogo
  }

  get menuActiveTextColor() {
    if (useSettingStore().sidebarTextTheme)
      return useSettingStore().theme
    else
      return this.variables.menuActiveText
  }

  get variables() {
    // TODO 禁用 CSS 注入页面 https://cn.vitejs.dev/guide/features.html
    return {
      menuBg: '#304156',
      menuText: '#bfcbd9',
      menuActiveText: '#409EFF', // Also see settings.sidebarTextTheme
    }
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu)
      return meta.activeMenu

    return path
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        {{ JSON.stringify(routes) }}
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
