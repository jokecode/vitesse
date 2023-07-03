import { acceptHMRUpdate, defineStore } from 'pinia'

// import elementVariables from '~/styles/element-variables.scss'
import defaultSettings from '~/settings'

export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      theme: '$--color-primary',
      fixedHeader: defaultSettings.fixedHeader,
      showSettings: defaultSettings.showSettings,
      showTagsView: defaultSettings.showTagsView,
      showSidebarLogo: defaultSettings.showSidebarLogo,
      sidebarTextTheme: defaultSettings.sidebarTextTheme,
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  getters: {
    // double: (state) => state.count * 2,
  },

  actions: {
    CHANGE_SETTING(payload: { key: string; value: any }) {
      const { key, value } = payload
      if (Object.prototype.hasOwnProperty.call(this, key))
        (this as any)[key] = value
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingStore as any, import.meta.hot))
