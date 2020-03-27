import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface SignFormProps {
  showSignModal: boolean;
  onCancel: () => void;
  query: () => void;
}

// 表单字段
const formItem = [
  { type: 'radio', label: '签约状态', placeholder: '请选择签约状态', model: 'aaa', options: 'tempOps' },
  { type: 'radio', label: '签约形式', placeholder: '请选择签约形式', model: 'bbb', options: 'tempOps' },
  { type: 'upload', label: '协议文本', placeholder: '请上传协议文本', model: 'ccc', accept: '.doc, .docx, .xls, .xlsx', hasTemplate: true }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择签约状态', whitespace: true, type: 'number' }],
  bbb: [{ required: true, message: '请选择服务项目', whitespace: true, type: 'number' }]
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

const SignForm: React.FC<SignFormProps> = props => {
  const { showSignModal, onCancel } = props;
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
  }, []);

  return (
    <Modal
      destroyOnClose
      title="导入"
      visible={showSignModal}
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

export default SignForm;
