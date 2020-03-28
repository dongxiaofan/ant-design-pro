import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button, message, Table, Popconfirm } from 'antd';
import BaseItem from '@/components/other/baseItem';
import { sendFormThead } from '../tableHead';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { TableListItem } from '../data';
import RoleApi from '@/services/Role.api';
moment.locale('zh-cn');

interface SendFormProps {
  showSendModal: boolean;
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
  { type: 'select', label: '按企业筛选', placeholder: '请选择企业', model: 'aaa', options: 'tempOps', labelInValue: true, onChange: 'selectOnChange' },
  { type: 'select', label: '按项目筛选', placeholder: '请选择项目', model: 'bbb', options: 'tempOps', labelInValue: true, onChange: 'selectOnChange' },
]

// 验证规则
const rules:any = {
}

// 表单所需下拉数据
let arrListDown = {
  tempOps: [
    {label: '选项一', value: 0},
    {label: '选项二', value: 1},
    {label: '选项三', value: 2}
  ]
}
// let tableData:any = []

// 表单样式
const formItemCol = 12
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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

const SendForm: React.FC<SendFormProps> = props => {
  const { showSendModal, onCancel, currentVal } = props;
  const [formData] = Form.useForm();
  const [sorter, setSorter, ] = useState<string>('');

  // 表单验证并提交
  const onFinish = async (values:any, props:any) => {
    console.log('表单验证并提交 values: ', values)
  }

  // 根据ID获取角色信息
  const getModel = async (currentVal:any) => {
    console.log('🌹 row数据-currentVal: ', currentVal)
  }

  useEffect(() => {
    getModel(currentVal)
  }, [props.currentVal]);

  const columns:any = sendFormThead

  return (
    <Modal
      destroyOnClose
      title="派单"
      visible={showSendModal}
      onCancel={() => onCancel()}
      footer={null}
      width={800}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItemCol={formItemCol}
          formItem={formItem}
          formRules={rules}
          arrListDown={arrListDown}
          listenCall={listenCall}
        />

        <ProTable
          className="modal-pro-table"
          rowKey="id"
          params={{pageSize: 5}}
          request={params => query(params)}
          columns={columns}
          rowSelection={{}}
          options={false}
          search={false}
          toolBarRender={(action, { selectedRows }) => [
            <Button disabled={!(selectedRows && selectedRows.length > 0)} onClick={() => {window.alert(selectedRows)}}>确定派单</Button>,
          ]}
        />
      </Form>
    </Modal>
  );
};

export default SendForm;
