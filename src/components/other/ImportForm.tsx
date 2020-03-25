import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, message, Upload } from 'antd'
import request from '@/utils/request'

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
  // file: [
  //   { required: true, message: '请选择需要上传的文件', whitespace: true }
  // ]
}

// 表单样式
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

let fileList:any
const templateDownLoadUrl = '/Content/Template/员工管理导入模板.xlsx?random=' + Math.floor(Math.random() * 10)
const actionUrl = '/api/Employee/ImportEmployeesAll'

// 确定上传
const handleUpload = (props:any) => {
  const formImport = new FormData();
  fileList.forEach((file:any) => {
    if (file != undefined) {
      formImport.append('file', file);
    }
  });
  request('/api/Employee/ImportEmployeesAll', {
    method: 'post',
    data: formImport
  }).then((resp:any) => {
    if (resp.success) {
      message.success(resp.message)
      props.onCancel()
    } else {
      message.error(resp.message)
    }
  })
};

// 移除文件
const onRemove = (file:any, index:number) => {
  const newFileList = fileList.slice();
  newFileList.splice(index, 1);
  fileList = newFileList
}

const beforeUpload = (file:any) => {
  fileList = [fileList, file]
  return false;
}

const ImportForm: React.FC<ImportFormProps> = props => {
  const { showImportModal, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="批量导入"
      visible={showImportModal}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formItemLayout} name="formImport" onFinish={() => handleUpload(props)}>
        {/* 表单部分 */}
        {formItem.map((item:any, index:any) => {
          return (
            <Form.Item label={item.label} name={item.model} rules={rules[`${item.model}`]} key={index}>                  
              <Button target="_blank" href={templateDownLoadUrl} className="mr-10">模板下载</Button>
              <Upload
                action={actionUrl}
                beforeUpload={beforeUpload}
                onRemove={(file) => onRemove(file, index)}
              >
                <Button>选择文件</Button>
              </Upload>
            </Form.Item>
          )
        })}

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
