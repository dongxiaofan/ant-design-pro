import React from 'react';
import { Modal, Form, Button, message, } from 'antd'
import RoleApi from '@/services/Role.api'
import tool from '@/lib/tool'
import BaseForm from '@/components/other/baseForm'
import { formatDate } from 'umi-types/locale';

let formItem = [
  { type: 'input', label: '角色名称', placeholder: '请输入角色名称', model: 'name' },
  { type: 'select', label: '数据权限', placeholder: '请选择数据权限', model: 'dataAccessRoleType', options: 'dataAccessRoleTypeList' },
  { type: 'select', label: '角色分类', placeholder: '请选择角色分类', model: 'operationRoleType', options: 'operationRoleTypeList' },
  { type: 'select', label: '产品类型', placeholder: '请选择产品类型', model: 'productTypeArr', options: 'productTypeSource', isMultiple: true },
  { type: 'switch', label: '启用', placeholder: '', model: 'enabled' },
  { type: 'tree', label: '菜单权限', placeholder: '请选择菜单权限', model: 'permissionIdList', value: [] }
]

class CreateRoleModal extends React.Component<any> {
  componentDidMount(){
    this.props.onRef(this) // ->将child传递给this.props.onRef()方法
  }

  state = {
    isShowModal: false,
    modalTitle: '',
    modalId: null,
    arrListDown: {
      dataAccessRoleTypeList: [],
      operationRoleTypeList: [],
      productTypeSource: []
    },
    permissionList: [], // 菜单权限列表
    selectNode: [], // 选中的权限
    // formItem: formItem,
    formData: {
      name: '',
      dataAccessRoleType: '',
      operationRoleType: '',
      productTypeArr: '',
      enabled: false,
      permissionIdList: []
    }
  };

  // 表单样式
  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  // 验证规则
  rules:any = {
    name: [
      { required: true, message: '请输入角色名称', whitespace: true, type: 'string' }
    ],
    dataAccessRoleType: [
      { required: true, message: '请选择数据权限', whitespace: true, type: 'string' }
    ],
    // permissionIdList: [
    //   { required: true, message: '请选择菜单权限', whitespace: true, type: 'string' }
    // ]
  }

  
  // 关闭弹窗
  onCancel = () => {
    this.setState({
      isShowModal: false
    })
  }

  // 显示弹窗
  show = () => {
    this.setState({
      isShowModal: true
    })
  }

  // 获取当前信息
  getModel = async (id:any) => {
    let {modalId, modalTitle, arrListDown, permissionList, selectNode, formData} = this.state
    modalId = id
    modalTitle = id ? '编辑角色' : '新增角色'
    var params = {'parameter.id': id}
    let resp = await RoleApi.getModel(params)
    if (resp.success) {
      var result = resp.data
      arrListDown.operationRoleTypeList = result.operationRoleTypeList // 操作类型
      arrListDown.dataAccessRoleTypeList = result.dataAccessRoleTypeList // 可访问的数据类型
      arrListDown.productTypeSource = result.productTypeSource
      permissionList = result.permissionList // 菜单权限列表
      selectNode = result.detail.permissionIdList // 已选中的权限id数组

      tool.getTree(result.permissionList)

      var detail = result.detail
      console.log('detail: ', detail)
      if (id) {
        Object.keys(formData).forEach(key => {
          if (key === 'enabled') {
            formData[key] = detail[key]
          } else {
            formData[key] = detail[key] + ''
          }
        })
        formData.productTypeArr = detail.productType ? detail.productType.split(',').map(Number) : []
      }
      
      this.setState({
        modalId,
        modalTitle,
        arrListDown,
        permissionList,
        formData
      })
      console.log('formData: ', formData)
      this.show()
    }
  }

  // 表单验证并提交
  onFinish = async (values:any) => {
    console.log('表单验证并提交 values: ', values)
    let arr:any = []
    if (values.permissionIdList) {
      values.permissionIdList.map((item:any) => {
        arr.push(item.value)
      })
      values.permissionIdList = arr
    }
    let resp = await RoleApi.save(values)
    if (resp.success) {
      message.success(resp.message)
      this.onCancel()
      this.props.query()
    } else {
      message.error(resp.message)
    }
  }

  render() {
    let {isShowModal, modalTitle, arrListDown, permissionList, selectNode} = this.state

    return (
      <Modal
        destroyOnClose
        title={modalTitle}
        visible={isShowModal}
        footer={null}
      >
        <Form {...this.formItemLayout} name="formData" onFinish={this.onFinish}>
          {/* 公用的表单部分 */}
          <BaseForm
            state={this.state}
            formItem={formItem}
            arrListDown={arrListDown}
            formRules={this.rules}
            selectTreeNode={selectNode}
            treeData={permissionList}
          />

          <div className="text-right pt-20">
            <Button className="mr-10" onClick={this.onCancel}>取消</Button>
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </Form>

      </Modal>
    )
  }
}

export default CreateRoleModal;
