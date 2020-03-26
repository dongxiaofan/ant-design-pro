import React, { useEffect, useState } from 'react';
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
  { type: 'input', label: '客户名称', placeholder: '请输入客户名称', model: 'aaa' },
  { type: 'input', label: '组织机构代码', placeholder: '请输入组织机构代码', model: 'bbb' },
  { type: 'input', label: '纳税编号', placeholder: '请输入纳税编号', model: 'ccc' },
  { type: 'select', label: '企业类型', placeholder: '请选择企业类型', model: 'ddd', options: 'tempOps', valType: 'number' },
  { type: 'select', label: '所属行业', placeholder: '请选择所属行业', model: 'eee', options: 'tempOps', valType: 'number' },
  { type: 'select', label: '企业规模', placeholder: '请选择企业规模', model: 'fff', options: 'tempOps', valType: 'number' },
  { type: 'areaCascader', label: '企业所在地', placeholder: '请输入详细地址', model: 'ggg' },
  { type: 'input', label: '联系方式', placeholder: '请输入联系方式', model: 'hhh' },
]

// 验证规则
const rules:any = {
  aaa: [
    { required: true, message: '请输入客户名称', whitespace: true, type: 'string' }
  ],
  bbb: [
    { required: true, message: '请输入组织机构代码', whitespace: true, type: 'string' }
  ],
  ccc: [
    { required: true, message: '请输入纳税编号', whitespace: true, type: 'string' }
  ],
  ddd: [
    { required: true, message: '请选择企业类型', whitespace: true, type: 'number' }
  ],
  eee: [
    { required: true, message: '请选择所属行业', whitespace: true, type: 'number' }
  ],
  fff: [
    { required: true, message: '请选择企业规模', whitespace: true, type: 'number' }
  ],
  ggg: [
    { required: true, message: '请选择企业所在地', whitespace: true, type: 'string' }
  ],
  hhh: [
    { required: true, message: '请输入联系方式', whitespace: true, type: 'string' }
  ]
}

// 表单所需下拉数据
let arrListDown = {
  tempOps: [
    {label: '选项一', value: 0},
    {label: '选项二', value: 1},
    {label: '选项三', value: 2},
    {label: '选项四', value: 3}
  ]
}
const areaTree:any = []

// 表单样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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

  // 根据ID获取角色信息
  const getModel = async (id:any) => {
    // var params = {'parameter.id': id}
    // let resp = await RoleApi.getModel(params)
    // if (resp.success) {
      
    // }
    formData.setFieldsValue({
      ...{}
    });
  }

  useEffect(() => {
    if (currentVal) {
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
          areaTree={areaTree}
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
