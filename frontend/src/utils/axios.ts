import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { SharedENV, getAxiosErrorMsg } from '@next-server/shared'

import { msgError } from '@/utils/msgNotice'
import { LOGIN_URL } from '@/config/index.ts'
import { useAuthStore } from '@/stores/modules/auth.ts'
import router from '@/routers/index.ts'

let controller = new AbortController()

const instance = axios.create({
  baseURL: SharedENV[import.meta.env.MODE],
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    config.signal = controller.signal
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
      controller.abort()
      controller = new AbortController()
      return Promise.reject(res.data)
    }
    msgError(`${message}` || '服务器偷偷跑到火星去玩了')
    return Promise.reject(new Error(`${message}` || '服务器偷偷跑到火星去玩了'))
  },
  (error) => {
    if (error.code !== 'ERR_CANCELED') {
      getAxiosErrorMsg(error)
      msgError(error.data.message)
    }
    return Promise.reject(error) // 上方 res.data.status != 200也会抛出提示。
  },
)

export default instance
