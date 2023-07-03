import { acceptHMRUpdate, defineStore } from 'pinia'

export enum DeviceType {
  Mobile,
  Desktop,
}

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
      device: DeviceType.Desktop,
      language: 'zh-CN',
      size: 'medium',
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  getters: {
    // double: (state) => state.count * 2,
  },

  actions: {
    TOGGLE_SIDEBAR(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      // TODO 完善逻辑
      // if (this.sidebar.opened) {
      //   setSidebarStatus('opened')
      // } else {
      //   setSidebarStatus('closed')
      // }
    },
    CLOSE_SIDEBAR(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      // setSidebarStatus('closed')
    },
    TOGGLE_DEVICE(device: DeviceType) {
      this.device = device
    },
    SET_LANGUAGE(language: string) {
      this.language = language
      // TODO setLanguage
      // setLanguage(this.language)
    },
    SET_SIZE(size: string) {
      this.size = size
      // TODO setSize
      // setSize(this.size)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore as any, import.meta.hot))
