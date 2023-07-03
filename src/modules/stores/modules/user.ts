import { acceptHMRUpdate, defineStore } from 'pinia'
import { useTagsViewStore } from '~/modules/stores/modules/tags-view'
import { getToken, removeToken, setToken } from '~/utils/cookies'
import user from '~/api/users'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      name: '',
      avatar: '',
      introduction: '',
      roles: Array<string>(),
      email: '',
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  getters: {
    // double: (state) => state.count * 2,
  },

  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    },
    SET_NAME(name: string) {
      this.name = name
    },
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    SET_INTRODUCTION(introduction: string) {
      this.introduction = introduction
    },
    SET_ROLES(roles: string[]) {
      this.roles = roles
    },
    SET_EMAIL(email: string) {
      this.email = email
    },
    async LOG_OUT() {
      if (this.token === '')
        throw new Error('LogOut: token is undefined!')

      await user.crud.logout()
      removeToken()

      // resetRouter()

      // Reset visited views and cached views
      useTagsViewStore().DEL_ALL_VISITED_VIEWS()
      useTagsViewStore().DEL_ALL_CACHED_VIEWS()

      this.SET_TOKEN('')
      this.SET_ROLES([])
    },
    async LOGIN(userInfo: { username: string; password: string }) {
      let { username, password } = userInfo
      username = username.trim()
      await user.crud.login({ username, password }).then((res) => {
        const { data } = res
        setToken(data.accessToken)
        this.SET_TOKEN(data.accessToken)
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
