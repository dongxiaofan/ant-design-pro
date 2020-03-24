import React from 'react';
import { Modal, Form, Button, message, Col, Select, Switch, Input, } from 'antd'
import RoleApi from '@/services/Role.api'
import tool from '@/lib/tool'
import BaseForm from '@/components/other/baseForm2'
import { query } from '@/services/user';
import { PropertySafetyFilled } from '@ant-design/icons';
const { Option } = Select;

interface CreateFormProps {
  showModal: boolean;
  onCancel: () => void;
  query: () => {}
}

const formItem = [
  { type: 'input', label: '角色名称', placeholder: '请输入角色名称', model: 'name' },
  { type: 'select', label: '数据权限', placeholder: '请选择数据权限', model: 'dataAccessRoleType', options: 'dataAccessRoleTypeList' },
  { type: 'select', label: '角色分类', placeholder: '请选择角色分类', model: 'operationRoleType', options: 'operationRoleTypeList' },
  { type: 'select', label: '产品类型', placeholder: '请选择产品类型', model: 'productTypeArr', options: 'productTypeSource', isMultiple: true },
  { type: 'switch', label: '启用', placeholder: '', model: 'enabled' },
  { type: 'tree', label: '菜单权限', placeholder: '请选择菜单权限', model: 'permissionIdList', value: [] }
]

const arrListDown = {
  dataAccessRoleTypeList: [{text: 'aaa', value: '0'}],
  operationRoleTypeList: [{text: 'bbb', value: '1'}],
  productTypeSource: [{text: 'ccc', value: '2'}],
}
const selectNode:any = []
const permissionList:any = [{value: '0-0', title: '0-0'}]

// 表单样式
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

// 验证规则
const rules:any = {
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
  } else {
    message.error(resp.message)
  }
  props.query()
}



const CreateForm: React.FC<CreateFormProps> = props => {
  const { showModal, onCancel, query } = props;

  return (
    <Modal
      destroyOnClose
      title="新建/编辑员工"
      visible={showModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      {/* {props.children} */}
      {/* <Form {...formItemLayout} name="formData" onFinish={async (values) => {
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
        } else {
          message.error(resp.message)
        }
        query()
      }}> */}
      <Form {...formItemLayout} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseForm
          formItem={formItem}
          arrListDown={arrListDown}
          formRules={rules}
          selectTreeNode={selectNode}
          treeData={permissionList}
        />

        <div className="text-right pt-20">
          <Button className="mr-10" onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">确定</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateForm;
