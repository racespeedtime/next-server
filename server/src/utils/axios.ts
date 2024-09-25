import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { SharedENV, getAxiosErrorMsg } from '@next-server/shared'

import { userApi } from '@/api'

let token = ''

const instance = axios.create({
  // eslint-disable-next-line node/prefer-global/process
  baseURL: SharedENV[process.env.NODE_ENV as keyof typeof SharedENV],
  timeout: 10000,
})

instance.interceptors.request.use(
  async (config) => {
    if (!token)
      token = await userApi.serverToken()
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
    if (code === 401)
      return Promise.reject(res.data)

    return Promise.reject(new Error(`${message}` || '服务器偷偷跑到火星去玩了'))
  },
  (error) => {
    // 处理网络错误，不是服务器响应的数据
    getAxiosErrorMsg(error)
    return Promise.reject(error)
  },
)

export default instance
