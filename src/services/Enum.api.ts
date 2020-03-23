import request from '@/utils/request';

export default class EnumApi {
  // 获取客服
  static async servers (params:any) {
    return request('/api/Enum/Servers', {
      method: 'post',
      data: params
    })
  }

  // 获取公司
  static async companys (params:any) {
    return request('/api/Enum/Companys', {
      method: 'post',
      data: params
    })
  }

  // 数据字典接口
  static async getEnum (params:any) {
    return request('/api/Enum/Enum', {
      method: 'get',
      params: params
    })
  }
}
