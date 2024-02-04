import type { AxiosResponse } from 'axios'
import axios from 'axios'

import { msgError } from '@/utils/msgNotice'
import { LOGIN_URL } from '@/config/index.ts'
import { useAuthStore } from '@/stores/modules/auth.ts'
import router from '@/routers/index.ts'

export interface Response<T> {
  code: number
  message: string | string[]
  data: T
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore()
    if (token)
      config.headers!.Authorization = `Bearer ${token}`
    return config
  },
  (error: any) => {
    error.data = {}
    error.data.message = '服务器异常，请联系管理员'
    return error
  },
)
// 请求返回之后的拦截器：数据或者状态
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code, data, message } = res.data

    if (code === 0)
      return data
    if (code === 401) {
      const authStore = useAuthStore()
      authStore.setToken('')
      msgError('登录身份过期，请重新登录')
      router.replace(LOGIN_URL)
      return Promise.reject(res.data)
    }
    msgError(`${message}` || '服务器偷偷跑到火星去玩了')
    return Promise.reject(new Error(`${message}` || '服务器偷偷跑到火星去玩了'))
  },
  (error) => {
    // 处理网络错误，不是服务器响应的数据
    error.data = {}
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.data.message = '错误请求'
          break
        case 401:
          error.data.message = '未授权，请重新登录'
          break
        case 403:
          error.data.message = '对不起，您没有权限访问'
          break
        case 404:
          error.data.message = '请求错误,未找到请求路径'
          break
        case 405:
          error.data.message = '请求方法未允许'
          break
        case 408:
          error.data.message = '请求超时'
          break
        case 500:
          error.data.message = '服务器又偷懒了，请重试'
          break
        case 501:
          error.data.message = '网络未实现'
          break
        case 502:
          error.data.message = '网络错误'
          break
        case 503:
          error.data.message = '服务不可用'
          break
        case 504:
          error.data.message = '网络超时'
          break
        case 505:
          error.data.message = 'http版本不支持该请求'
          break
        default:
          error.data.message = `连接错误${error.response.status}`
      }
    }
    else {
      error.data.message = '连接到服务器失败'
    }
    msgError(error.data.message)
    return Promise.reject(error) // 上方 res.data.status != 200也会抛出提示。
  },
)

export default {
  get<T = any>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return instance.post(url, data)
  },

  patch<T = any>(url: string, data?: object): Promise<T> {
    return instance.patch(url, data)
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return instance.put(url, data)
  },

  delete<T = any>(url: string): Promise<T> {
    return instance.delete(url)
  },

  upload<T = any>(url: string, params?: object): Promise<T> {
    return instance.post(url, params, {
      timeout: undefined,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
