import React, { useEffect } from 'react';
import { Modal, Form, Button, message } from 'antd'
import RoleApi from '@/services/Role.api'
import BaseItem from '@/components/other/baseItem'
import tool from '@/lib/tool'

interface CreateFormProps {
  showCreateModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
  modalTitle: any
}

// 表单字段
const formItem = [
  { type: 'input', label: '角色名称', placeholder: '请输入角色名称', model: 'name' },
  { type: 'select', label: '数据权限', placeholder: '请选择数据权限', model: 'dataAccessRoleType', options: 'dataAccessRoleTypeList' },
  { type: 'select', label: '角色分类', placeholder: '请选择角色分类', model: 'operationRoleType', options: 'operationRoleTypeList' },
  { type: 'select', label: '产品类型', placeholder: '请选择产品类型', model: 'productTypeArr', options: 'productTypeSource', isMultiple: true },
  { type: 'switch', label: '启用', placeholder: '', model: 'enabled' },
  { type: 'tree', label: '菜单权限', placeholder: '请选择菜单权限', model: 'permissionIdList' }
]

// 验证规则
const rules:any = {
  name: [
    { required: true, message: '请输入角色名称', whitespace: true, type: 'string' }
  ],
  dataAccessRoleType: [
    { required: true, message: '请选择数据权限', whitespace: true, type: 'string' }
  ],
  permissionIdList: [
    { required: true, message: '请选择菜单权限', whitespace: true, type: 'array' }
  ]
}

// 表单所需下拉数据
let arrListDown = {
  dataAccessRoleTypeList: [],
  operationRoleTypeList: [],
  productTypeSource: [],
}
let permissionList:any = []

// 表单样式
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

// 根据ID获取角色信息
const getModel = async (id:any) => {
  var params = {'parameter.id': id}
  let resp = await RoleApi.getModel(params)
  if (resp.success) {
    var result = resp.data
    arrListDown.operationRoleTypeList = result.operationRoleTypeList // 操作类型
    arrListDown.dataAccessRoleTypeList = result.dataAccessRoleTypeList // 可访问的数据类型
    arrListDown.productTypeSource = result.productTypeSource
    permissionList = result.permissionList // 菜单权限列表
    tool.getTree(result.permissionList)
  }
}

// 表单验证并提交
const onFinish = async (values:any, props:any) => {
  console.log('表单验证并提交 values: ', values)
  let arr:any = []
  if (values.permissionIdList && values.permissionIdList != undefined) {
    values.permissionIdList.map((item:any) => {
      arr.push(item.value)
    })
    values.permissionIdList = arr
  }
  let resp = await RoleApi.save(values)
  if (resp.success) {
    message.success(resp.message)
    props.onCancel()
    props.query()
  } else {
    message.error(resp.message)
  }
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { showCreateModal, onCancel, currentVal,  modalTitle } = props;
  const [formData] = Form.useForm();

  useEffect(() => {
    if (currentVal) {
      formData.setFieldsValue({
        ...currentVal
      });
      getModel(currentVal.id)
    } else {
      formData.resetFields();
      getModel('')
    }
  }, [props.currentVal]);

  return (
    <Modal
      destroyOnClose
      title={modalTitle}
      visible={showCreateModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItem={formItem}
          arrListDown={arrListDown}
          formRules={rules}
          treeData={permissionList}
        />

        {/* 弹窗按钮部分 */}
        <div className="text-right pt-20">
          <Button className="mr-10" onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">确定</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateForm;
