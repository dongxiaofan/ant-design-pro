import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button, message, Table, Popconfirm } from 'antd';
import BaseItem from '@/components/other/baseItem';
import { generateBillFormThead } from '../tableHead';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { TableListItem } from '../data';
import RoleApi from '@/services/Role.api';
moment.locale('zh-cn');

interface GenerateBillFormProps {
  showGenerateBillModal: boolean;
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
  { type: 'text', label: '合计人数', placeholder: '合计人数', model: 'aaa' },
  { type: 'text', label: '合计业务费', placeholder: '合计业务费', model: 'bbb' },
  { type: 'text', label: '合计服务费', placeholder: '合计服务费', model: 'ccc' },
  { type: 'text', label: '总计费用', placeholder: '总计费用', model: 'ddd' },
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

// 删除单条记录
const handleDelete = async (params:any, actionRef:any) => {
  console.log('点击了删除 params: ', params)
}

const GenerateBillForm: React.FC<GenerateBillFormProps> = props => {
  const { showGenerateBillModal, onCancel, currentVal } = props;
  const [formData] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const [sorter, setSorter, ] = useState<string>('');

  // 确认提交
  const onFinish = async () => {
    console.log('确认提交')
  }

  // 根据ID获取角色信息
  const getModel = async (currentVal:any) => {
    console.log('🌹 row数据-currentVal: ', currentVal)
  }

  useEffect(() => {
    getModel(currentVal)
  }, [props.currentVal]);

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 80,
    fixed: 'right',
    render: (text:string, record:any) => (
      <div>
        <Popconfirm
          title="是否确定删除？"
          onConfirm={() => handleDelete({id: record.id}, actionRef)}
          okText="确认"
          cancelText="取消">
          <a>删除</a>
        </Popconfirm>
      </div>
    ),
  }
  const columns:any = generateBillFormThead.concat(option)
  const scroll:any = {x: 'true'}

  return (
    <Modal
      destroyOnClose
      title="派单"
      visible={showGenerateBillModal}
      onCancel={() => onCancel()}
      footer={null}
      width={800}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItemCol={formItemCol}
          formItem={formItem}
        />

        <ProTable
          className="modal-pro-table"
          rowKey="id"
          params={{pageSize: 5}}
          request={params => query(params)}
          actionRef={actionRef}
          columns={columns}
          options={false}
          search={false}
          scroll={scroll}
        />
      </Form>

      {/* 弹窗按钮部分 */}
      <div className="text-right pt-20">
        <Button className="mr-10" onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={onFinish}>确定</Button>
      </div>
    </Modal>
  );
};

export default GenerateBillForm;
