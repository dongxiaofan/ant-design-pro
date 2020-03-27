import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message, Table, Popconfirm } from 'antd'
import BaseItem from '@/components/other/baseItem'
import { setFormThead } from '../tableHead';

interface SetFormProps {
  showSetModal: boolean;
  onCancel: () => void;
  query: () => void;
}
interface SetToTable {
  aaa: Date,
  bbb: string,
  ccc: string
}

// 表单字段
const formItem = [
  { type: 'input', label: '商保名称', placeholder: '请选择商保名称', model: 'bbb' },
  { type: 'input', label: '商保价格', placeholder: '请选择商保价格', model: 'ccc', valType: 'number' },
  { type: 'radio', label: '价格单位', placeholder: '请选择价格单位', model: 'ddd', options: 'tempOps', style: 'hide-label' },
  { type: 'upload', label: '商保资料', placeholder: '请上传商保资料', model: 'eee', accept: '.doc, .docx, .xls, .xlsx' }
]

// 验证规则
const rules:any = {
  bbb: [{ required: true, message: '请选择商保名称', whitespace: true, type: 'string' }],
  ccc: [{ required: true, message: '请选择商保价格', whitespace: true, type: 'string' }],
  ddd: [{ required: true, message: '请选择价格单位', whitespace: true, type: 'number' }]
}

// 表单所需下拉数据
let arrListDown = {
  tempOps: [
    {label: '元/天', value: 0},
    {label: '元/月', value: 1},
    {label: '元/年', value: 2}
  ]
}
// let tableData:any = []

// 表单样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

// 删除单条记录
const handleDelete = async (params:any) => {
}

const SetForm: React.FC<SetFormProps> = props => {
  const { showSetModal, onCancel } = props;
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState<Array<SetToTable>>([]);

  // 表单验证并提交
  const onFinish = async (values:any, props:any) => {
    console.log('表单验证并提交 values: ', values)
    var tempArr = tableData.concat({...{aaa: new Date()}, ...values})
    setTableData(tempArr)
  }

  // 根据ID获取角色信息
  const getModel = async (id:any) => {
    formData.setFieldsValue({
      ...{}
    });
  }

  useEffect(() => {
  }, []);

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (text:string, record:any) => (
      <div>
        <Popconfirm
          title="是否确定删除？"
          onConfirm={() => handleDelete({id: record.id})}
          okText="确认"
          cancelText="取消">
          <a>删除</a>
        </Popconfirm>
      </div>
    ),
  }
  const columns:any = setFormThead.concat(option)

  return (
    <Modal
      destroyOnClose
      title="商保设置"
      visible={showSetModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItem={formItem}
          formRules={rules}
          arrListDown={arrListDown}
        />
        {/* <div className="text-center">
          <Button type="primary" htmlType="submit">添加到表格</Button>
        </div> */}

        {/* 弹窗按钮部分 */}
        <div className="text-right pt-20 mb-20">
          {/* <Button className="mr-10" onClick={onCancel}>取消</Button> */}
          <Button type="primary" htmlType="submit">添加到表格</Button>
        </div>

        <Table columns={columns} dataSource={tableData} rowKey={record => record.bbb} />
      </Form>
    </Modal>
  );
};

export default SetForm;
