import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface BuyFormProps {
  showBuyModal: boolean;
  onCancel: () => void;
  query: () => void;
}

// 表单字段
const formItem = [
  { type: 'select', label: '姓名', placeholder: '请选择姓名', model: 'aaa', options: 'tempOps' },
  { type: 'select', label: '身份证', placeholder: '请选择身份证', model: 'bbb', options: 'tempOps' },
  { type: 'input', label: '服务企业', placeholder: '请输入服务企业', model: 'ccc', isGive: true },
  { type: 'input', label: '服务项目', placeholder: '请输入服务项目', model: 'ddd', isGive: true },
  { type: 'input', label: '签约状态', placeholder: '请输入签约状态', model: 'eee', isGive: true },
  { type: 'select', label: '商保名称', placeholder: '请选择商保名称', model: 'fff', options: 'tempOps' },
  { type: 'input', label: '商保价格', placeholder: '请选择商保价格', model: 'ggg', isGive: true, valType: 'number' },
  { type: 'input', label: '保单编号', placeholder: '请选择保单编号', model: 'hhh' },
  { type: 'date', label: '保险开始时间', placeholder: '请选择保险开始时间', model: 'iii' },
  { type: 'date', label: '保险结束时间', placeholder: '请选择保险结束时间', model: 'jjj' }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择姓名', whitespace: true, type: 'number' }],
  bbb: [{ required: true, message: '请选择身份证', whitespace: true, type: 'number' }],
  ccc: [{ required: true, message: '请输入服务企业', whitespace: true, type: 'string' }],
  ddd: [{ required: true, message: '请输入服务项目', whitespace: true, type: 'string' }],
  eee: [{ required: true, message: '请输入签约状态', whitespace: true, type: 'string' }],
  fff: [{ required: true, message: '请选择商保名称', whitespace: true, type: 'number' }],
  ggg: [{ required: true, message: '请选择商保价格', whitespace: true, type: 'string' }],
  hhh: [{ required: true, message: '请选择保单编号', whitespace: true, type: 'string' }],
  iii: [{ required: true, message: '请选择保险开始时间', whitespace: true, type: 'object' }],
  jjj: [{ required: true, message: '请选择保险结束时间', whitespace: true, type: 'object' }]
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

const BuyForm: React.FC<BuyFormProps> = props => {
  const { showBuyModal, onCancel } = props;
  const [formData] = Form.useForm();

  // 根据ID获取角色信息
  const getModel = async (id:any) => {
    formData.setFieldsValue({
      ...{}
    });
  }

  useEffect(() => {
  }, []);

  return (
    <Modal
      destroyOnClose
      title="购买商保"
      visible={showBuyModal}
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

export default BuyForm;
