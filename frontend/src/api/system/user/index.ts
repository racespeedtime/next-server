import type { LoginUser } from './type'
import request from '@/utils/axios.ts'

export const userApi = {
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
