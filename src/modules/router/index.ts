import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import type { App } from 'vue'
import exceptionRoutes from '~/modules/router/route.exception'
import asyncRoutes from '~/modules/router/route.async'
import commonRoutes from '~/modules/router/route.common'

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes,
]

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
})

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to, from) => {
  // eslint-disable-next-line no-console
  console.log('全局路由前置守卫：to,from\n', to, from)
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
  if (!NProgress.isStarted())
    NProgress.start()
})

router.afterEach((to, from) => {
  // eslint-disable-next-line no-console
  console.log('全局路由后置守卫：to,from\n', to, from)
  NProgress.done()
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
