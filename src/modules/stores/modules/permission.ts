import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import exceptionRoutes from '~/modules/router/route.exception'
import asyncRoutes from '~/modules/router/route.async'
import commonRoutes from '~/modules/router/route.common'

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: Array<RouteRecordRaw>(),
      dynamicRoutes: Array<RouteRecordRaw>(),
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  // getters: {
  //   getRoutes: (state) => state.routes * 2,
  // },

  actions: {
    SET_ROUTES(routes: RouteRecordRaw[]) {
      this.routes = asyncRoutes.concat(commonRoutes).concat(exceptionRoutes).concat(routes || [])
      this.dynamicRoutes = routes
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore as any, import.meta.hot))
