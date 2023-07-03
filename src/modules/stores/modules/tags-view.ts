import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RouteLocationNormalized, RouteRecordName } from 'vue-router'

export interface ITagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: Array<ITagView>(),
      cachedViews: Array<RouteRecordName>() || undefined,
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  getters: {
    // double: (state) => state.count * 2,
  },

  actions: {
    ADD_VISITED_VIEW(view: ITagView) {
      if (this.visitedViews.some((v: ITagView) => v.path === view.path))
        return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name',
        }),
      )
    },
    ADD_CACHED_VIEW(view: ITagView) {
      if (!view || !view.name)
        return
      if (this.cachedViews.includes(view.name))
        return
      if (!view.meta?.noCache)
        this.cachedViews.push(view.name)
    },
    DEL_VISITED_VIEW(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(view: ITagView) {
      if (!view || !view.name)
        return
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },
    DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v: ITagView) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
      if (!view || !view.name)
        return
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      }
      else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS() {
      // keep affix tags
      this.visitedViews = this.visitedViews.filter((tag: ITagView) => tag.meta?.affix)
    },
    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },
    UPDATE_VISITED_VIEW(view: ITagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTagsViewStore as any, import.meta.hot))
