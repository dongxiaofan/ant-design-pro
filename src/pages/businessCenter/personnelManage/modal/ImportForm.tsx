import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'

interface ImportFormProps {
  showImportModal: boolean;
  onCancel: () => void;
  query: () => void;
}

// 表单字段
const formItem = [
  { type: 'select', label: '服务客户', placeholder: '请选择服务客户', model: 'aaa', options: 'tempOps' },
  { type: 'select', label: '服务项目', placeholder: '请选择服务项目', model: 'bbb', options: 'tempOps' },
  { type: 'upload', label: '导入数据', placeholder: '请上传导入数据', model: 'ccc', accept: '.doc, .docx, .xls, .xlsx' }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择服务客户', whitespace: true, type: 'number' }],
  bbb: [{ required: true, message: '请选择服务项目', whitespace: true, type: 'number' }],
  ccc: [{ required: true, message: '请上传导入数据', whitespace: true, type: 'any' }]
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

const ImportForm: React.FC<ImportFormProps> = props => {
  const { showImportModal, onCancel } = props;
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
      visible={showImportModal}
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

export default ImportForm;
