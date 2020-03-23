import request from '@/utils/request';

export default class RoleApi {
  // 根据条件获取角色信息
  static async getList (params:any) {
    return request('/api/Role/GetList', {
      method: 'post',
      data: params
    })
  }

  // 根据ID获取角色信息
  static async getModel (params:any) {
    return request('/api/Role/GetModel', {
      method: 'get',
      params: params
    })
  }

  // 保存角色信息
  static async save (params:any) {
    return request('/api/Role/Save', {
      method: 'post',
      data: params
    })
  }

  // 根据角色ID批量保存或删除用户角色列表(绑定/取消绑定)
  static async saveUserRole (params:any) {
    return request('/api/Role/SaveUserRole', {
      method: 'post',
      data: params
    })
  }

  // 启用/禁用角色信息
  static async enabledList (params:any) {
    return request('/api/Role/EnabledList', {
      method: 'post',
      data: params
    })
  }

  // 删除角色信息
  static async delete (params:any) {
    return request('/api/Role/Delete', {
      method: 'post',
      data: params
    })
  }

  // 获取权限树
  static async getPermissionTreeList (params:any) {
    return request('/api/Role/GetPermissionTreeList', {
      method: 'get',
      data: params
    })
  }

  // 根据角色批量添加或删除角色权限
  static async setRolePermission (params:any) {
    return request('/api/Role/SetRolePermission', {
      method: 'post',
      data: params
    })
  }
}
