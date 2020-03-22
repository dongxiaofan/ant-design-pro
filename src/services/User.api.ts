import request from '@/utils/request';

export default class UserApi {
  // 根据条件获取用户信息
  static async getList (params: any) {
    params.pageIndex = params.current
    delete params.current
    return request('/api/User/GetList', {
      method: 'post',
      data: params
    })
  }

  // 根据ID获取用户信息
  static async getModel (params: any) {
    return request('/api/User/GetModel', {
      method: 'get',
      params: params
    })
  }

  // 保存用户信息
  static async save (params: any) {
    return request('/api/User/Save', {
      method: 'post',
      data: params
    })
  }

  // 启用/禁用用户信息
  static async enabledList (params: any) {
    return request('/api/User/EnabledList', {
      method: 'post',
      data: params
    })
  }

  // 删除用户信息
  static async handleDelete (params: any) {
    return request('/api/User/Delete', {
      method: 'post',
      data: params
    })
  }

  // 修改密码
  static async updatePassword (params: any) {
    return request('/api/User/UpdatePassword', {
      method: 'post',
      data: params
    })
  }

  // 导入
  static async handleImport (params: any) {
    return request('/api/User/Import', {
      method: 'post',
      data: params
    })
  }

  // 导出模板
  static async exportTemplate (params: any) {
    return request('/api/User/ExportTemplate', {
      method: 'get',
      params: params
    })
  }

  // 下载错误数据
  static async exportErrorFile (params: any) {
    return request('/api/User/ExportErrorFile', {
      method: 'get',
      params: params
    })
  }

  // 创建VXCore账户
  static async createAccountForVX (params: any) {
    return request('/api/User/CreateAccountForVX', {
      method: 'get',
      params: params
    })
  }
}
