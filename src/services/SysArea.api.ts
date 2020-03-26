import request from '@/utils/request';

export default class SysAreaApi {
  // 获取所有省份
  static getProvince () {
    return request('/SysArea/GetProvince', {
      method: 'get'
    })
  }

  // 获取目标省份下的所有城市
  static getCity (params:any) {
    return request('/SysArea/GetCity', {
      method: 'get',
      params: params
    })
  }

  // 获取目标城市下的所有区县
  static getArea (params:any) {
    return request('/SysArea/GetArea', {
      method: 'get',
      params: params
    })
  }

  // 获取中国所有城市树
  static getAreaTree () {
    return request('/SysArea/GetAreaTree', {
      method: 'get',
      // params: params
    })
  }
}
