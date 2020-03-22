import request from '@/utils/request';

export default class EmployeeApi {
// 获取员工花名册列表
  static async getEmployeeListNew (params: any) {
    params.pageIndex = params.current
    delete params.current
    return request('/api/Employee/GetEmployeeListNew', {
      method: 'post',
      data: params
    })
  }

  // 删除员工
  static async deleteEmployee (params: any) {
    return request('/api/Employee/DeleteEmployee', {
      method: 'DELETE',
      params: params
    })
  }

  // 获取离职信息列表
  static async getResignInfoList (params: any) {
    params.pageIndex = params.current
    delete params.current
    return request('/api/Employee/GetResignInfoList', {
      method: 'post',
      params: params
    })
  }

  // 添加或修改离职信息
  static async postResignInfo (params: any) {
    return request('/api/Employee/PostResignInfo', {
      method: 'post',
      data: params
    })
  }

  // 获取单个员工基本信息
  static async getEmployee (params: any) {
    return request('/api/Employee/GetEmployee', {
      method: 'post',
      params: params
    })
  }

  // 添加或修改员工信息
  static async postEmployee (params: any) {
    return request('/api/Employee/PostEmployee', {
      method: 'post',
      data: params
    })
  }

  // 批量修改员工信息
  static async batchUpdateEmployees (params: any) {
    return request('/api/Employee/BatchUpdateEmployees', {
      method: 'post',
      data: params
    })
  }

  // 员工附件上传
  static async postUpload (id: string, params: any) {
    return request('/api/Employee/' + id + '/Upload', {
      method: 'post',
      data: params
    })
  }

  // 获取员工附件列表
  static async getAttachmentList (params: any) {
    return request('/api/Employee/GetAttachmentList', {
      method: 'post',
      params: params
    })
  }

  // 添加或者修改员工合同
  static async postContract (params: any) {
    return request('/api/Employee/PostContract', {
      method: 'post',
      data: params
    })
  }

  // 删除员工合同
  static async deleteContract (params: any) {
    return request('/api/Employee/DeleteContract', {
      method: 'delete',
      params: params
    })
  }

  // 删除员工合同附件
  static async deleteEmpAtta (params: any) {
    return request('/api/Employee/DeleteEmpAtta', {
      method: 'delete',
      params: params
    })
  }

  // 删除员工照片附件
  static async deleteEmpPic (params: any) {
    return request('/api/Employee/DeleteEmpPic', {
      method: 'delete',
      params: params
    })
  }

  // 获取员工合同列表
  static async getContract (params: any) {
    return request('/api/Employee/GetContract', {
      method: 'post',
      params: params
    })
  }

  // 添加或者修改员工参保信息
  static async postInsuranceInfo (params: any) {
    return request('/api/Employee/PostInsuranceInfo', {
      method: 'post',
      data: params
    })
  }

  // 获取员工参保信息
  static async getInsuranceInfoList (params: any) {
    return request('/api/Employee/GetInsuranceInfoList', {
      method: 'post',
      params: params
    })
  }

  // 离职
  static async employeeDimission (params: any) {
    return request('/api/Employee/EmployeeDimission', {
      method: 'post',
      data: params
    })
  }

  // 导出员工数据
  static async exportEmployees (params: any) {
    return request('/api/Employee/ExportEmployees', {
      method: 'post',
      data: params
    })
  }

  // 下载员工附件
  static async downloadFile (params: any) {
    return request('/api/Employee/DownloadFile', {
      method: 'get',
      params: params
    })
  }

  // 批量下载员工照片数据
  static async downloadPictureFile (params: any) {
    return request('/api/Employee/DownloadPictureFile', {
      method: 'get',
      params: params
    })
  }

  // 获取参保人员
  static async getInCommercial (params: any) {
    return request('/api/Employee/GetInCommercial', {
      method: 'post',
      data: params
    })
  }

  // 获取被替换人员
  static async getOutCommercial (params: any) {
    return request('/api/Employee/GetOutCommercial', {
      method: 'post',
      data: params
    })
  }

  // 商保替换前验证
  static async checkCommercialChange (params: any) {
    return request('/api/Employee/CheckCommercialChange', {
      method: 'post',
      data: params
    })
  }

  // 商保替换
  static async empCommercialChange (params: any) {
    return request('/api/Employee/EmpCommercialChange', {
      method: 'post',
      data: params
    })
  }

  // 员工调动校验
  static async checkEmployeeTransfer (params: any) {
    return request('/api/Employee/CheckEmployeeTransfer', {
      method: 'post',
      data: params
    })
  }

  // 获取调动的所有公司
  static async getEmployeeTransferAllCompanys (params: any) {
    return request('/api/Employee/GetEmployeeTransferAllCompanys', {
      method: 'get',
      params: params
    })
  }

  // 员工调动保存
  static async postEmployeeTransfer (params: any) {
    return request('/api/Employee/PostEmployeeTransfer', {
      method: 'post',
      data: params
    })
  }
}
