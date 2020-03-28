import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message, Divider } from 'antd'
import BaseItem from '@/components/other/baseItem'
import { ScissorOutlined } from '@ant-design/icons';

interface ModifyFormProps {
  showModifyModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
}

// 表单字段(更改前人员)
const oldFormItem = [
  { type: 'text', label: '姓名', placeholder: '请选择姓名', model: 'name', options: 'tempOps' },
  { type: 'text', label: '身份证', placeholder: '请选择身份证', model: 'id', options: 'tempOps' }
]

// 表单字段
const formItem = [
  { type: 'select', label: '姓名', placeholder: '请选择姓名', model: 'aaa', options: 'tempOps' },
  { type: 'select', label: '身份证', placeholder: '请选择身份证', model: 'bbb', options: 'tempOps' },
  { type: 'input', label: '服务企业', placeholder: '请输入服务企业', model: 'ccc', isGive: true },
  { type: 'input', label: '服务项目', placeholder: '请输入服务项目', model: 'ddd', isGive: true },
  { type: 'input', label: '签约状态', placeholder: '请输入签约状态', model: 'eee', isGive: true },
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择姓名', whitespace: true, type: 'number' }],
  bbb: [{ required: true, message: '请选择身份证', whitespace: true, type: 'number' }],
  ccc: [{ required: true, message: '请输入服务企业', whitespace: true, type: 'string' }],
  ddd: [{ required: true, message: '请输入服务项目', whitespace: true, type: 'string' }],
  eee: [{ required: true, message: '请输入签约状态', whitespace: true, type: 'string' }]
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
}

const ModifyForm: React.FC<ModifyFormProps> = props => {
  const { showModifyModal, onCancel, currentVal } = props;
  const [formData] = Form.useForm();
  const [oldFormData] = Form.useForm();

  // 根据ID获取角色信息
  const getModel = async (currentVal:any) => {
    console.log('🌹 row数据-currentVal: ', currentVal)
    oldFormData.setFieldsValue({
      ...currentVal
    });
  }

  useEffect(() => {
    getModel(currentVal)
  }, [props.currentVal]);

  return (
    <Modal
      destroyOnClose
      title="更改商保"
      visible={showModifyModal}
      onCancel={() => onCancel()}
      footer={null}
      width={800}
    >
      <p className="base-title mb-10">更改前人员</p>
      <Form {...formItemLayout} form={oldFormData} name="oldFormData">
        {/* 公用的表单部分 */}
        <BaseItem
          formItemCol={formItemCol}
          formItem={oldFormItem}
        />
      </Form>

      <Divider dashed><ScissorOutlined className="text-gray-ccc" /></Divider>

      <p className="base-title mb-10">更改后人员</p>
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

export default ModifyForm;
