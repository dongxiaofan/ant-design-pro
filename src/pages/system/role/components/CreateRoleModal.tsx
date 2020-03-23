import React, { useState } from 'react';
import { Modal, Form, Col, Select, Switch, Input, Button, message, TreeSelect } from 'antd'
import RoleApi from '@/services/Role.api'
import tool from '@/lib/tool'
const { Option } = Select;

let formItem = [
  { type: 'input', label: '角色名称', placeholder: '请输入角色名称', model: 'name' },
  { type: 'select', label: '数据权限', placeholder: '请选择数据权限', model: 'dataAccessRoleType', options: 'dataAccessRoleTypeList' },
  { type: 'select', label: '角色分类', placeholder: '请选择角色分类', model: 'operationRoleType', options: 'operationRoleTypeList' },
  { type: 'select', label: '产品类型', placeholder: '请选择产品类型', model: 'productTypeArr', options: 'productTypeSource' },
  { type: 'switch', label: '启用', placeholder: '', model: 'enabled' },
  { type: 'tree', label: '菜单权限', placeholder: '请选择菜单权限', model: 'permissionIdList', value: '' }
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
    formItem: formItem
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
  getModel = async (id:any, row:any) => {
    let {modalId, modalTitle, arrListDown, permissionList, selectNode} = this.state
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
      
      this.setState({
        modalId,
        modalTitle,
        arrListDown,
        permissionList
      })
    }
  }

  // 表单验证并提交
  onFinish = async (values:any) => {
    console.log('🚄 values: ', values)
    let arr:any = []
    if (values.permissionIdList) {
      values.permissionIdList.map((item:any) => {
        arr.push(item.value)
      })
      values.permissionIdList = arr
    }
    console.log('🚄🚄🚄 values: ', values)
    let resp = await RoleApi.save(values)
    console.log('保存角色resp: ', resp)
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
          {formItem.map((item,index) => {          
            if (item.type === 'select') {
              return (
                <Col span={24} key={item.model}>
                  <Form.Item label={item.label} name={item.model} rules={this.rules[`${item.model}`]}>
                    <Select allowClear>
                      {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((ops:any) => {
                        return (
                          <Option key={ops.value} value={ops.value}>{ops.text}</Option>
                        )
                      }) : null}
                    </Select>
                  </Form.Item>
                </Col>
              )
            } else if (item.type === 'switch') {
              return (
                <Col span={24} key={item.model}>
                  <Form.Item label={item.label} name={item.model} rules={this.rules[`${item.model}`]}>                          
                    <Switch />
                  </Form.Item>
                </Col>
              )
            } else if (item.type === 'tree') {
              return (
                <Col span={24} key={item.model}>
                  <Form.Item label={item.label} name={item.model} rules={this.rules[`${item.model}`]}>
                    <TreeSelect
                      // multiple
                      value={selectNode}
                      treeData={permissionList}
                      treeCheckable={true}
                      treeCheckStrictly={true}
                      labelInValue={false}
                    />
                  </Form.Item>
                </Col>
              )
            } else {
              return (
                <Col span={24} key={item.model}>
                  <Form.Item label={item.label} name={item.model} rules={this.rules[`${item.model}`]}>
                    <Input allowClear placeholder={item.placeholder} />
                  </Form.Item>
                </Col>
              )
            }
          })}
          <Form.Item className="text-right pt-20">
            <Button className="mr-10" onClick={this.onCancel}>取消</Button>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default CreateRoleModal;
