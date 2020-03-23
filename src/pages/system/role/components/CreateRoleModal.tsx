import React from 'react';
import { Modal, Form, Col, Select, Switch, Input, Button, Tree } from 'antd'
import RoleApi from '@/services/Role.api'
const { Option } = Select;
const { TreeNode } = Tree


const permissionList:any = [{ title: '0-0',key: '0-0' }]

const onFinish = (values:any) => {
  console.log('values: ', values);
};

const onSelect = (selectedKeys:any, info:any) => {
  console.log('selected', selectedKeys, info)
};

const onCheck = (checkedKeys:any, info:any) => {
  console.log('onCheck', checkedKeys, info)
};

const getModel = async (id:string) => {
  var params = {'parameter.id': id}
  let resp = await RoleApi.getModel(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

const renderTreeNodes = (data:any) =>
    data.map((item:any) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} {...item} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    })

const arrListDown = {
  dataAccessRoleTypeList: [{label: '111', value: '0'}],
  operationRoleTypeList: [{label: '222', value: '1'}],
  productTypeSource: [{label: '333', value: '2'}]
}

const formItem = [
  { type: 'input', label: '角色名称', placeholder: '请输入角色名称', model: 'name' },
  { type: 'select', label: '数据权限', placeholder: '请选择数据权限', model: 'dataAccessRoleType', options: 'dataAccessRoleTypeList' },
  { type: 'select', label: '角色分类', placeholder: '请选择角色分类', model: 'operationRoleType', options: 'operationRoleTypeList' },
  { type: 'select', label: '产品类型', placeholder: '请选择产品类型', model: 'productTypeArr', options: 'productTypeSource' },
  { type: 'switch', label: '启用', placeholder: '', model: 'enabled' },
  { type: 'tree', label: '菜单权限', placeholder: '请输入菜单权限', model: 'permissionIdList' }
]

const CreateRoleModal = (props:any) => {
  const { modalVisible, onCancel } = props;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const rules:any = {
    name: [
      { required: true, message: '角色名称', whitespace: true, type: 'string' }
    ],
    dataAccessRoleType: [
      { required: true, message: '数据权限', whitespace: true, type: 'string' }
    ]
  }

  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      footer={null}
    >
      <Form {...formItemLayout} name="formData" onFinish={onFinish}>
        {formItem.map((item,index) => {          
          if (item.type === 'select') {
            return (
              <Col span={24} key={item.model}>
                <Form.Item label={item.label} name={item.model} rules={rules[`${item.model}`]}>
                  <Select allowClear>
                    {arrListDown[`${item.options}`] ? arrListDown[`${item.options}`].map((ops:any) => {
                      return (
                        <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                      )
                    }) : null}
                  </Select>
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'switch') {
            return (
              <Col span={24} key={item.model}>
                <Form.Item label={item.label} name={item.model} rules={rules[`${item.model}`]}>                          
                  <Switch />
                </Form.Item>
              </Col>
            )
          } else if (item.type === 'tree') {
            return (
              <Col span={24} key={item.model}>
                <Form.Item label={item.label} name={item.model} rules={rules[`${item.model}`]}>
                  <Tree
                    checkable
                    onCheck={onCheck}
                    onSelect={onSelect}
                    treeData={permissionList}
                  />
                </Form.Item>
              </Col>
            )
          } else {
            return (
              <Col span={24} key={item.model}>
                <Form.Item label={item.label} name={item.model} rules={rules[`${item.model}`]}>
                  <Input allowClear placeholder={item.placeholder}/>
                </Form.Item>
              </Col>
            )
          }
        })}
        <div className="text-right pt-20">
          <Button className="mr-10" onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">确定</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateRoleModal;
