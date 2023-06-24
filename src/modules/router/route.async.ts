// 需要鉴权的业务路由
import type { RouteRecordRaw } from 'vue-router'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/ebutton',
  },
  {
    path: '/process',
    name: 'process',
    meta: {
      title: 'Template configuration process',
      icon: '',
    },
    component: () => import('~/views/example/MarkdownPage.vue'),
  },
  {
    path: '/ebutton',
    name: 'ElButton',
    meta: {
      title: '测试Element Plus的按钮',
      icon: '',
    },
    component: () => import('~/views/test/ebutton.vue'),
  },
  {
    path: '/button',
    name: 'Button',
    meta: {
      title: '测试按钮',
      icon: '',
    },
    component: () => import('~/views/test2/button.vue'),
  },
]

export default asyncRoutes
