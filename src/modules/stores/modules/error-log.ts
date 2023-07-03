import { acceptHMRUpdate, defineStore } from 'pinia'

interface IErrorLog {
  err: Error
  vm: any
  info: string
  url: string
}

export interface IErrorLogState {
  logs: IErrorLog[]
}

export const useErrorLogStore = defineStore('errorLog', {
  state: () => {
    return {
      logs: Array<IErrorLog>(),
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })

  getters: {
    // double: (state) => state.count * 2,
  },

  actions: {
    ADD_ERROR_LOG(log: IErrorLog) {
      this.logs.push(log)
    },
    CLEAR_ERROR_LOG() {
      this.logs.splice(0)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useErrorLogStore as any, import.meta.hot))
