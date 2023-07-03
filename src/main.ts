// import { createI18n } from 'vue-i18n'
import App from './App.vue'

// import i18n from '~/modules/i18n/index'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import SvgIcon from '~/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

// pinia
// import store from '~/modules/stores'
import { setupStore } from '~/modules/stores'

// vue router
// import router from '~/modules/router'
import { setupRouter } from '~/modules/router'

// i18n
// import router from '~/modules/router'
import { setupI18n } from '~/modules/i18n'

// const i18n = createI18n({
//   legacy: false,
//   locale: 'zh-CN',
//   messages: {},
// })

// const app = createApp(App)
//
// app.use(router).use(store)
//
// app.use(i18n)
//
// app.mount('#app')

async function bootstrap() {
  const app = createApp(App)

  app.component('SvgIcon', SvgIcon)

  // Configure routing
  // 配置路由
  setupRouter(app)

  // Configure store
  // 配置 store
  setupStore(app)

  // // Initialize internal system configuration
  // // 初始化内部系统配置
  // initAppConfigStore()

  // // Register global components
  // // 注册全局组件
  // registerGlobComp(app)

  // Multilingual configuration
  // 多语言配置
  setupI18n(app)

  // // router-guard
  // // 路由守卫
  // setupRouterGuard(router)

  // // Register global directive
  // // 注册全局指令
  // setupGlobDirectives(app)

  // // Configure global error handling
  // // 配置全局错误处理
  // setupErrorHandle(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app')
}

bootstrap()
