import type { CustomAxiosRequest, LoginUser } from 'shared/types'

export function createUserApi(request: CustomAxiosRequest) {
  return {
    // 仅服务器使用,用于内部通信token，需要做安全拦截，比如检测是否为本地地址，不应该被其他玩家获取到
    // 并且token不应过期
    serverToken() {
      return request.get('/auth/serverToken')
    },

    login(params: LoginUser) {
      return request.post('/auth/login', params)
    },

    // 多条件分页查询数据
    listPage(params: any) {
      return request.get('/user', params)
    },

    // 根据ID进行查询
    getById(id: any) {
      return request.get(`/user/${id}`)
    },

    // 根据ID进行修改
    update(data: any) {
      return request.patch(`/user/${data.id}`, data)
    },

    // 添加
    add(data: any) {
      return request.post('/user', data)
    },

    // 删除
    deleteById(id: any) {
      return request.delete(`/user/${id}`)
    },

    // 批量删除
    batchDelete(userIds: string[]) {
      return request.post('/user/batchRemove', { userIds }) // 第一种传参方式
    },
  }
}
