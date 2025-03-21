<script lang="ts">
import path from 'node:path'
import { Component, Vue, Watch } from 'vue-facing-decorator'
import type { RouteRecordRaw } from 'vue-router'
import ScrollPane from './ScrollPane.vue'
import { usePermissionStore } from '~/modules/stores/modules/permission'
import type { ITagView } from '~/modules/stores/modules/tags-view'
import { useTagsViewStore } from '~/modules/stores/modules/tags-view'

@Component({
  name: 'TagsView',
  components: {
    ScrollPane,
  },
})
export default class TagsView extends Vue {
  // PermissionModule = usePermissionStore()
  // TagsViewModule = useTagsViewStore()

  visible = false
  top = 0
  left = 0
  selectedTag: ITagView = {}
  affixTags: ITagView[] = []

  get visitedViews() {
    return useTagsViewStore().visitedViews
  }

  get routes() {
    return usePermissionStore().routes
  }

  @Watch('$route')
  onRouteChange() {
    this.addTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  onVisibleChange(value: boolean) {
    if (value)
      document.body.addEventListener('click', this.closeMenu)
    else
      document.body.removeEventListener('click', this.closeMenu)
  }

  mounted() {
    this.initTags()
    this.addTags()
  }

  isActive(route: ITagView) {
    return route.path === this.$route.path
  }

  isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix
  }

  filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
    let tags: ITagView[] = []
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path)
        if (childTags.length >= 1)
          tags = [...tags, ...childTags]
      }
    })
    return tags
  }

  initTags() {
    this.affixTags = this.filterAffixTags(this.routes)
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name)
        useTagsViewStore().ADD_VISITED_VIEW(tag)
    }
  }

  addTags() {
    const { name } = this.$route
    if (name) {
      useTagsViewStore().ADD_VISITED_VIEW(this.$route)
      useTagsViewStore().ADD_CACHED_VIEW(this.$route)
    }
    return false
  }

  moveToCurrentTag() {
    const tags = this.$refs.tag as any[] // TODO: better typescript support for router-link
    this.$nextTick(() => {
      for (const tag of tags) {
        if ((tag.to as ITagView).path === this.$route.path) {
          (this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any)
          // When query is different then update
          if ((tag.to as ITagView).fullPath !== this.$route.fullPath)
            useTagsViewStore().UPDATE_VISITED_VIEW(this.$route)

          break
        }
      }
    })
  }

  refreshSelectedTag(view: ITagView) {
    useTagsViewStore().DEL_CACHED_VIEW(view)
    const { fullPath } = view
    this.$nextTick(() => {
      this.$router.replace({
        path: `/redirect${fullPath}`,
      }).catch((err) => {
        console.warn(err)
      })
    })
  }

  closeSelectedTag(view: ITagView) {
    useTagsViewStore().DEL_VISITED_VIEW(view)
    useTagsViewStore().DEL_CACHED_VIEW(view)
    if (this.isActive(view))
      this.toLastView(useTagsViewStore().visitedViews, view)
  }

  closeOthersTags() {
    if (this.selectedTag.fullPath !== this.$route.path && this.selectedTag.fullPath !== undefined) {
      this.$router.push(this.selectedTag.fullPath).catch((err) => {
        console.warn(err)
      })
    }
    useTagsViewStore().DEL_OTHERS_VISITED_VIEWS(this.selectedTag)
    useTagsViewStore().DEL_OTHERS_CACHED_VIEWS(this.selectedTag)
    this.moveToCurrentTag()
  }

  closeAllTags(view: ITagView) {
    useTagsViewStore().DEL_ALL_VISITED_VIEWS()
    useTagsViewStore().DEL_ALL_CACHED_VIEWS()
    if (this.affixTags.some(tag => tag.path === this.$route.path))
      return

    this.toLastView(useTagsViewStore().visitedViews, view)
  }

  toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch((err) => {
        console.warn(err)
      })
    }
    else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router.replace({ path: `/redirect${view.fullPath}` }).catch((err) => {
          console.warn(err)
        })
      }
      else {
        this.$router.push('/').catch((err) => {
          console.warn(err)
        })
      }
    }
  }

  openMenu(tag: ITagView, e: MouseEvent) {
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft)
      this.left = maxLeft
    else
      this.left = left

    this.top = e.clientY
    this.visible = true
    this.selectedTag = tag
  }

  closeMenu() {
    this.visible = false
  }

  handleScroll() {
    this.closeMenu()
  }
}
</script>

<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ $t(`route.${tag.meta.title}`) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: `${left}px`, top: `${top}px` }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        {{ $t('tagsView.refresh') }}
      </li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >
        {{
          $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ $t('tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        {{ $t('tagsView.closeAll') }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
