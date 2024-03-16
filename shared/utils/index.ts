import type { CustomAxiosRequest } from 'shared/types'

export function getAxiosErrorMsg(error) {
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
}

export function getRestfulApi(request: CustomAxiosRequest, module: string) {
  return {
    findAll(params: any) {
      return request.get(`/${module}`, params)
    },

    findOne(id: any) {
      return request.get(`/${module}/${id}`)
    },

    create(data: any) {
      return request.post(`/${module}`, data)
    },

    update(data: any) {
      return request.patch(`/${module}/${data.id}`, data)
    },

    remove(id: any) {
      return request.delete(`/${module}/${id}`)
    },
  }
}
