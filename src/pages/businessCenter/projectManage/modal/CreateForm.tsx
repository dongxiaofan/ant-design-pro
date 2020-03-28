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
  { type: 'date', label: '项目开始时间', placeholder: '请选择项目开始时间', model: 'aaa' },
  { type: 'input', label: '项目名称', placeholder: '请输入项目名称', model: 'bbb' },
  { type: 'select', label: '所属客户', placeholder: '请选择所属客户', model: 'ccc', options: 'tempOps' },
  { type: 'input', label: '需要人数(人)', placeholder: '请输入需要人数(人)', model: 'ddd', valType: 'number' },
  { type: 'input', label: '项目金额（元）', placeholder: '请输入项目金额（元）', model: 'eee', valType: 'number' },
  { type: 'input', label: '服务费率', placeholder: '请选择服务费率', model: 'fff', valType: 'number' },
  { type: 'select', label: '项目场景', placeholder: '请选择项目场景', model: 'ggg', options: 'tempOps' },
  { type: 'input', label: '项目对接人', placeholder: '请输入项目对接人', model: 'hhh' },
  { type: 'input', label: '项目对接人电话', placeholder: '请输入项目对接人电话', model: 'iii' },
  { type: 'upload', label: '项目协议', placeholder: '请上传项目协议', model: 'jjj', accept: '.doc, .docx, .xls, .xlsx' },
  { type: 'date', label: '合同开始时间', placeholder: '请选择合同开始时间', model: 'kkk' },
  { type: 'date', label: '合同结束时间', placeholder: '请选择合同结束时间', model: 'lll' },
  { type: 'input', label: '合同编号', placeholder: '请输入合同编号', model: 'mmm' }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请选择项目开始时间', whitespace: true, type: 'object' }],
  bbb: [{ required: true, message: '请输入项目名称', whitespace: true, type: 'string' }],
  ccc: [{ required: true, message: '请选择所属客户', whitespace: true, type: 'number' }],
  ddd: [{ required: true, message: '请输入需要人数(人)', whitespace: true, type: 'string' }],
  eee: [{ required: true, message: '请输入项目金额（元）', whitespace: true, type: 'string' }],
  fff: [{ required: true, message: '请选择服务费率', whitespace: true, type: 'string' }],
  ggg: [{ required: true, message: '请选择项目场景', whitespace: true, type: 'number' }],
  hhh: [{ required: true, message: '请输入项目对接人', whitespace: true, type: 'string' }],
  iii: [{ required: true, message: '请输入项目对接人电话', whitespace: true, type: 'string' }],
  jjj: [{ required: true, message: '请上传项目协议', whitespace: true, type: 'any' }],
  kkk: [{ required: true, message: '请选择合同开始时间', whitespace: true, type: 'object' }],
  lll: [{ required: true, message: '请选择合同结束时间', whitespace: true, type: 'object' }],
  mmm: [{ required: true, message: '请输入合同编号', whitespace: true, type: 'string' }]
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

export default CreateForm;
