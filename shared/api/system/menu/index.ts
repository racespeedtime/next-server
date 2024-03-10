import type { CustomAxiosRequest } from 'shared/types'

export function createMenuApi(request: CustomAxiosRequest) {
  return {
  // 通过token查询相关用户信息、按钮权限、菜单权限数据，token必须有效
    getRoles(roleIds: string[]) {
      return request.post('/auth/router/getRoles', { roleIds })
    },

    // 获取正常所有菜单数据
    list(params?) {
      return request.get('/auth/router', params)
    },

    // 根据ID进行查询
    getById(id) {
      return request.get(`/auth/router/${id}`)
    },

    // 根据ID进行修改
    update(id, data) {
      return request.patch(`/auth/router/${id}`, data)
    },

    // 添加
    add(data) {
      return request.post('/auth/router', data)
    },

    // 删除
    deleteById(id) {
      return request.delete(`/auth/router/${id}`)
    },

    // 保存角色和菜单权限之间的关系
    saveRoleMenu(payload) {
      return request.post(`/auth/router/setRole`, payload)
    },
  }
}
