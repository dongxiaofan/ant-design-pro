import React, { useEffect } from 'react';
import { Modal, Form, Button, message } from 'antd'
import RoleApi from '@/services/Role.api'
import BaseItem from '@/components/other/baseItem'
import tool from '@/lib/tool'

interface ImportFormProps {
  showImportModal: boolean;
  onCancel: () => void;
  query: () => void;
}

// 表单字段
const formItem = [
  { type: 'file', label: '选择文件', placeholder: '请选择文件', model: 'file' }
]

// 验证规则
const rules:any = {
  file: [
    { required: true, message: '请选择需要上传的文件', whitespace: true }
  ]
}

// 表单样式
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const templateDownLoadUrl = '/Content/Template/员工管理导入模板.xlsx?random=' + Math.floor(Math.random() * 10)
const actionUrl = '/api/Employee/ImportEmployeesAll'

// 表单验证并提交
const onFinish = async (values:any, props:any) => {
  console.log('表单验证并提交 values: ', values)
  let arr:any = []
  if (values.permissionIdList && values.permissionIdList != undefined) {
    values.permissionIdList.map((item:any) => {
      arr.push(item.value)
    })
    values.permissionIdList = arr
  }
  let resp = await RoleApi.save(values)
  if (resp.success) {
    message.success(resp.message)
    props.onCancel()
    props.query()
  } else {
    message.error(resp.message)
  }
}

const ImportForm: React.FC<ImportFormProps> = props => {
  const { showImportModal, onCancel,  } = props;
  const [formData] = Form.useForm();

  return (
    <Modal
      destroyOnClose
      title="批量导入"
      visible={showImportModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} form={formData} name="formData" onFinish={(values) => onFinish(values, props)}>
        {/* 公用的表单部分 */}
        <BaseItem
          formItem={formItem}
          formRules={rules}
          actionUrl={actionUrl}
          templateDownLoadUrl={templateDownLoadUrl}
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
