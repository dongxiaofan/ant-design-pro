import request from '@/utils/request';

export default class PolicySupportApi {
  // 获取单个政策支持文件
  static async getPolicySupport (params:any){
    return request('/api/PolicySupport/GetPolicySupport', {
      method: 'post',
      data: params
    })
  }

  // 获取政策支持列表
  static async getPolicySupportList (params:any){
    return request('/api/PolicySupport/GetPolicySupportList', {
      method: 'post',
      data: params
    })
  }

  // 文件上传
  static async fileUpload (params:any, PSID: string){
    return request('/api/PolicySupport/FileUpload?PSID=' + PSID, {
      method: 'post',
      // data: params,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
      body: params
    })
  }

  // 删除政策支持文件
  static async deletePolicySupport (params:any){
    return request('/api/PolicySupport/DeletePolicySupport', {
      method: 'delete',
      data: params
    })
  }

  // 新建文件夹
  static async createDir (params:any){
    return request('/api/PolicySupport/CreateDir', {
      method: 'post',
      params: params
    })
  }

  // 下载文件
  static async downloadFile (params:any){
    return request('/api/PolicySupport/DownloadFile', {
      method: 'post',
      params: params
    })
  }

  // 重命名
  static async reName (params:any){
    return request('/api/PolicySupport/ReName', {
      method: 'post',
      data: params
    })
  }

  // 获取组织架构
  static async getOrganizationUnitTree (params:any){
    return request('/api/PolicySupport/GetOrganizationUnitTree', {
      method: 'get',
      params: params
    })
  }

  // 文件共享
  static async fileShare (params:any){
    return request('/api/PolicySupport/FileShare', {
      method: 'post',
      data: params
    })
  }

  // 取消共享
  static async unFileShare (params:any){
    return request('/api/PolicySupport/UnFileShare', {
      method: 'post',
      data: params
    })
  }
}