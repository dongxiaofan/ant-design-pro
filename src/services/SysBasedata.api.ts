import request from '@/utils/request';

export default class SysBasedataApi {
  // 根据条件获取基础数据
  static async getList (params:any) {
    return request('/SysBasedata/GetList', {
      method: 'post',
      data: params
    })
  }

  // 根据类型条件获取基础数据(Value=编码)
  static async getSelectValueList (params:any) {
    return request('/SysBasedata/GetSelectValueList', {
      method: 'get',
      params: params
    })
  }

  // 根据类型条件获取基础数据(Value=主键)
  static async getSelectIdList (params:any) {
    return request('/SysBasedata/GetSelectIdList', {
      method: 'get',
      params: params
    })
  }

  // 保存基础数据
  static async save (params:any) {
    return request('/SysBasedata/Save', {
      method: 'post',
      data: params
    })
  }

  // 启用/禁用基础数据
  static async enabledList (params:any) {
    return request('/SysBasedata/EnabledList', {
      method: 'post',
      data: params
    })
  }

  // 基础数据类型改变事件返回结果
  static async typeChange (params:any) {
    return request('/SysBasedata/TypeChange', {
      method: 'post',
      data: params
    })
  }

  // 基础数据父级改变事件返回结果
  static async parentChange (params:any) {
    return request('/SysBasedata/ParentChange', {
      method: 'post',
      data: params
    })
  }

  // 向上\向下排序
  static async updateOrderBy (params:any) {
    return request('/SysBasedata/UpdateOrderBy', {
      method: 'post',
      data: params
    })
  }

  // 根据基础数据ID更新是否默认【IsDefault】
  static async updateDefault (params:any) {
    return request('/SysBasedata/UpdateDefault', {
      method: 'post',
      data: params
    })
  }
}
