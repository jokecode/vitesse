<script lang="ts">
import path from 'node:path'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import type { RouteRecordRaw } from 'vue-router'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '~/utils/validate'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    SidebarItemLink,
  },
})
export default class SidebarItem extends Vue {
  @Prop({
    required: true,
  })
  item!: RouteRecordRaw

  @Prop({
    default: false,
  })
  isCollapse!: boolean

  @Prop({
    default: true,
  })
  isFirstLevel!: boolean

  @Prop({
    default: '',
  })
  basePath!: string

  get alwaysShowRootMenu() {
    return !!(this.item.meta && this.item.meta.alwaysShow)
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        return !(item.meta && item.meta.hidden)
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1)
      return null

    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden)
          return child
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  resolvePath(routePath: string) {
    if (isExternal(routePath))
      return routePath

    if (isExternal(this.basePath))
      return this.basePath

    return path.resolve(this.basePath, routePath)
  }
}
</script>

<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', { 'first-level': isFirstLevel }]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" />
          <!-- <img v-if="theOnlyOneChild.meta.icon" :src="`@svg/${theOnlyOneChild.meta.icon}.svg`"> -->
          <template #title>
            <span v-if="theOnlyOneChild.meta.title">{{ $t(`route.${theOnlyOneChild.meta?.title}`) }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <!-- <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" /> -->
        <img v-if="item.meta && item.meta.icon" :src="`@svg/${item.meta.icon}.svg`">
        <span v-if="item.meta && item.meta.title">{{ $t(`route.${item.meta?.title}`) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss">
.el-sub-menu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-sub-menu>.el-submenu__title,
  .el-sub-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
&.first-level {
  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    &>.el-submenu__title {
      padding: 0px !important;

      .el-submenu__icon-arrow {
        display: none;
      }

      &>span {
        visibility: hidden;
      }
    }
  }
}
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
