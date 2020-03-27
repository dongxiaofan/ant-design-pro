import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface CreateFormProps {
  showCreateModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
  modalTitle: any;
  areaTree: any;
}

// 表单字段
const formItem = [
  { type: 'select', label: '服务客户', placeholder: '请选择服务客户', model: 'aaa', options: 'tempOps' },
  { type: 'select', label: '服务项目', placeholder: '请选择服务项目', model: 'bbb', options: 'tempOps' },
  { type: 'input', label: '姓名', placeholder: '请输入姓名', model: 'ccc' },
  { type: 'input', label: '身份证号', placeholder: '请输入身份证号', model: 'ddd' },
  { type: 'input', label: '开户行', placeholder: '请输入开户行', model: 'eee' },
  { type: 'input', label: '银行卡号', placeholder: '请选择银行卡号', model: 'fff', valType: 'number' },
  { type: 'input', label: '手机号码', placeholder: '请选择手机号码', model: 'ggg', valType: 'number' }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择服务客户', whitespace: true, type: 'number' }],
  bbb: [{ required: true, message: '请选择服务项目', whitespace: true, type: 'number' }],
  ccc: [{ required: true, message: '请输入姓名', whitespace: true, type: 'string' }],
  ddd: [{ required: true, message: '请输入身份证号', whitespace: true, type: 'string' }],
  eee: [{ required: true, message: '请输入开户行', whitespace: true, type: 'string' }],
  fff: [{ required: true, message: '请选择银行卡号', whitespace: true, type: 'string' }],
  ggg: [{ required: true, message: '请选择手机号码', whitespace: true, type: 'string' }]
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
const formItemCol = 12
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
  const { showCreateModal, onCancel, currentVal,  modalTitle, areaTree } = props;
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
      width={800}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItemCol={formItemCol}
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
