import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

class Http {
  // private readonly options: AxiosRequestConfig
  private axiosInstance: AxiosInstance

  // 构造函数 参数 options
  constructor(params: AxiosRequestConfig) {
    if (!params.timeout)
      params.timeout = 1000 * 5

    // this.options = params
    this.axiosInstance = axios.create(params) // 生成实例
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.defaults.baseURL = 'https://www.fastmock.site/mock/424ac4519fc31bb3761078b6b5db57c2/api'
    this.axiosInstance.defaults.headers.post['Content-Type']
      = 'application/json'
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // if (!config.headers)
        //   config.headers = {}
        // config.headers.Authorization = CSRF_TOKEN;

        return config
      },
      () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          code: 1,
          message: '请求错误，请联系管理员',
        })
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        // let message = ''
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 2:
        //       message = '未登录，直接跳转到登录页面'
        //       break
        //     case 3:
        //       message = 'TOKEN过期，拒绝访问，直接跳转到登录页面'
        //       break
        //     case 4:
        //       message = '请求路径错误'
        //       break
        //     case 5:
        //       message = '系统异常，请联系管理员'
        //       break
        //     default:
        //       message = '未知错误，请联系管理员'
        //       break
        //   }
        // }
        // else {
        //   if (error.code && error.code === 'ECONNABORTED')
        //     message = '请求超时，请检查网是否正常'
        //   else
        //     message = '未知错误，请稍后再试'
        // }
        // // eslint-disable-next-line prefer-promise-reject-errors
        // return Promise.reject({
        //   code: -1,
        //   message,
        // })
        ElMessage({
          message: error.message,
          grouping: true,
          type: 'error',
          duration: 5 * 1000,
        })
        return Promise.reject(error)
      },
    )
  }

  /**
   * Http get
   * @param url 请求路径
   * @param config 配置信息
   * @returns Promise
   */
  get(url: string, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Http post
   * @param url 请求路径
   * @param data 请求数据
   * @param config 配置
   * @returns Promise
   */
  post(url: string, data?: any, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, data, config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Http put 请求
   * @param url 请求路径
   * @param data 请求数据
   * @param config 配置
   * @returns Promise
   */
  put(url: string, data?: any, config?: any) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(url, data, config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Http patch 请求
   * @param url 请求路径
   * @param data 请求数据
   * @param config 配置
   * @returns Promise
   */
  patch(url: string, data?: any, config?: any) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(url, data, config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Http delete 请求
   * @param url 请求路径
   * @param config 配置 (data 请求数据, params 请求参数)
   * @returns Promise
   */
  delete(url: string, config?: any) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(url, config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const http = new Http({})

export default http
