import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface CreateFormProps {
  showCreateModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
  modalTitle: any;
}

// 表单字段
const formItem = [
  { type: 'input', label:'输入订单名称', placeholder: '请输入订单名称', model: 'aaa' },
  { type: 'select', label: '所属客户', placeholder: '请选择所属客户', model: 'bbb', options: 'tempOps' },
  { type: 'select', label: '所属项目', placeholder: '请选择所属项目', model: 'ccc', options: 'tempOps' },
  { type: 'input', label: '需要人数', placeholder: '请输入需要人数(人)', model: 'ddd', valType: 'number' },
  { type: 'input', label: '订单价格', placeholder: '请输入订单价格(元)', model: 'eee', valType: 'number' },
  { type: 'textarea', label: '订单内容', placeholder: '请输入订单内容', model: 'fff' },
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请输入订单名称', whitespace: true, type: 'string' }],
  bbb: [{ required: true, message: '请选择所属客户', whitespace: true, type: 'number' }],
  ccc: [{ required: true, message: '请选择所属客户', whitespace: true, type: 'number' }],
  ddd: [{ required: true, message: '请输入需要人数(人)', whitespace: true, type: 'string' }],
  eee: [{ required: true, message: '请输入订单价格(元)', whitespace: true, type: 'string' }],
  fff: [{ required: true, message: '请输入订单内容', whitespace: true, type: 'string' }]
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
// const areaTree:any = []

// 表单样式
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

// 表单验证并提交
const onFinish = async (values:any, props:any) => {
  console.log('表单验证并提交 values: ', values)
  props.onCancel()
  // let resp = await RoleApi.save(values)
  // if (resp.success) {
  //   message.success(resp.message)
  //   props.onCancel()
  //   props.query()
  // } else {
  //   message.error(resp.message)
  // }
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
