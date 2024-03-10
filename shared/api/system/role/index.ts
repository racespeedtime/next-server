import type { CustomAxiosRequest } from 'shared/types'

export function createRoleApi(request: CustomAxiosRequest) {
  return {
    listPage(params) {
      return request.get('role', params)
    },

    // 查询所有角色
    role(payload = {}) {
      return request.get('role', payload)
    },

    // 根据ID进行查询
    getById(id) {
      return request.get(`/role/${id}`)
    },

    // 根据ID进行修改
    update(id, data) {
      return request.patch(`/role/${id}`, data)
    },

    // 添加
    add(data) {
      return request.post('/role', data)
    },

    // 删除
    deleteById(id) {
      return request.delete(`/role/${id}`)
    },

    // 批量删除
    batchDelete(payload) {
      return request.post('/role/batchRemove', payload)
    },

    // 根据当前用户ID分配角色
    assignUserRole(data) {
      return request.post('/role/setUserRoles', data) // 第一种传参方式
    },
  }
}
