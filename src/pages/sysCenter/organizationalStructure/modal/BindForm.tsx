import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message } from 'antd'
import BaseItem from '@/components/other/baseItem'
import RoleApi from '@/services/Role.api';
import ProTable from '@ant-design/pro-table';
import { bindThead } from '../tableHead';

interface BindProps {
  showBindModal: boolean;
  onCancel: () => void;
  query: () => void;
  currentVal: any;
}

// 获取列表
const query = async (params:any) => {
  let resp = await RoleApi.getList(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

// 表单字段
const formItem = [
  { type: 'input', label:'部门名称', placeholder: '请输入部门名称', model: 'aaa', isGive: true },
  { type: 'select', label: '部门主管', placeholder: '请输入部门主管', model: 'bbb', options: 'tempOps', onChange: 'selectOnChange' }
]

// 验证规则
const rules:any = {
  aaa: [{ required: true, message: '请输入部门名称', whitespace: true, type: 'string' }],
  bbb: [{ required: true, message: '请输入部门主管', whitespace: true, type: 'number' }]
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

// 监听所有调用的方法
const listenCall = (methodsWords:any, ...values:any) => {
  if (methodsWords === 'selectOnChange') {
    selectOnChange(values)
  }
}

// 监听下拉框变化
const selectOnChange = (values:any) => {
  console.log('values: ', values)
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

const Bind: React.FC<BindProps> = props => {
  const { showBindModal, onCancel, currentVal } = props;
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
      title="绑定员工"
      visible={showBindModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItem={formItem}
          arrListDown={arrListDown}
          formRules={rules}
          listenCall={listenCall}
        />

        {/* 弹窗按钮部分 */}
        {/* <div className="text-right pt-20">
          <Button className="mr-10" onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">确定</Button>
        </div> */}

        <ProTable
          className="modal-pro-table"
          rowKey="id"
          params={{pageSize: 5}}
          request={params => query(params)}
          columns={bindThead}
          rowSelection={{}}
          options={false}
          search={false}
          toolBarRender={(action, { selectedRows }) => [
            <Button disabled={!(selectedRows && selectedRows.length > 0)} onClick={() => {window.alert(selectedRows)}}>确认绑定</Button>,
          ]}
        />
      </Form>
    </Modal>
  );
};

export default Bind;
