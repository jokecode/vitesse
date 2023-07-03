<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarLogo from '~/layouts/components/Sidebar/SidebarLogo.vue'
import { useSettingStore } from '~/modules/stores/modules/settings'
import { useAppStore } from '~/modules/stores/modules/app'
import { usePermissionStore } from '~/modules/stores/modules/permission'

const showLogo = computed(() => useSettingStore().showSidebarLogo)
const sidebar = computed(() => useAppStore().sidebar)
const isCollapse = computed(() => !sidebar.value.opened)

const activeMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu)
    return meta.activeMenu as string

  return path
})

// TODO: background-color 改为动态获取$subMenuBg
const variables = {
  menuBg: '#304156',
  menuText: '#bfcbd9',
  menuActiveText: '#409EFF', // Also see settings.sidebarTextTheme
  subMenuHover: '#001528',
  baseLevelPadding: '15px',
}

const menuActiveTextColor = computed(() => {
  if (useSettingStore().sidebarTextTheme)
    return useSettingStore().theme
  else
    return variables.menuActiveText
})

const routes = computed(() => {
  usePermissionStore().SET_ROUTES([])
  return usePermissionStore().routes
})
// usePermissionStore().routes as RouteRecordRaw[]

// eslint-disable-next-line no-console
console.log('============>', routes.value)

function handleOpen(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath)
}
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- TODO: background-color 改为动态获取$subMenuBg -->
      <el-menu
        active-text-color="#ffd04b"
        class="sys-menu"
        :default-active="activeMenu"
        :unique-opened="false"
        :collapse-transition="false"
        :collapse="isCollapse"
        :style="{
          '--el-menu-bg-color': variables.menuBg,
          '--el-menu-text-color': variables.menuText,
          '--el-menu-active-color': menuActiveTextColor,
          '--el-menu-hover-bg-color': variables.subMenuHover,
          '--el-menu-base-level-padding': variables.baseLevelPadding,
        }"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">
              item one
            </el-menu-item>
            <el-menu-item index="1-2">
              item two
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">
              item three
            </el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>
              item four
            </template>
            <el-menu-item index="1-4-1">
              item one
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><IconMenu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><Document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.sys-menu:not(.el-menu--collapse) {
  width: $sideBarWidth;
}
</style>

<style scoped lang="scss">
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
