import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface StopFormProps {
  showStopModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
}

// 表单字段
const formItem = [
  { type: 'date', label: '提前停保时间', placeholder: '请选择提前停保时间', model: 'aaa' },
  { type: 'input', label: '保险公司退费', placeholder: '请选择保险公司退费', model: 'bbb', valType: 'number' },
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择提前停保时间', whitespace: true, type: 'object' }],
  bbb: [{ required: true, message: '请选择服务项目', whitespace: true, type: 'string' }]
}

// 表单所需下拉数据
let arrListDown = {
  tempOps: [
    {label: '选项一', value: 0},
    {label: '选项二', value: 1}
  ]
}
const templateUrl:string = '/api/CustomerSalary/ExportTemplate?random=' + Math.floor(Math.random()*10)

// 表单样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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

const StopForm: React.FC<StopFormProps> = props => {
  const { showStopModal, onCancel, currentVal } = props;
  const [formData] = Form.useForm();

  // 根据ID获取角色信息
  const getModel = async (id:any) => {
    console.log('🌹 row数据-currentVal: ', currentVal)
  }

  useEffect(() => {
    getModel(currentVal)
  }, [props.currentVal]);

  return (
    <Modal
      destroyOnClose
      title="提前停保"
      visible={showStopModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItem={formItem}
          arrListDown={arrListDown}
          formRules={rules}
          templateUrl={templateUrl}
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

export default StopForm;
