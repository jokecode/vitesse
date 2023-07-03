// 需要鉴权的业务路由
import type { RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '~/layouts/index.vue'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '~/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/dashboard',
    name: 'AsyncRoutes',
    meta: {
      // title: 'AsyncRoutes',
      // icon: 'AsyncRoutes',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '~/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true,
        },
      },
      {
        path: 'button2',
        component: () => import('~/views/test2/button.vue'),
        name: 'Button2',
        meta: {
          title: '测试按钮2',
          icon: '',
        },
      },
      {
        path: 'test',
        component: () => import('~/components/test/index.vue'),
        name: 'Test',
        meta: {
          title: 'Test',
          icon: '',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '~/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
]

export default asyncRoutes
