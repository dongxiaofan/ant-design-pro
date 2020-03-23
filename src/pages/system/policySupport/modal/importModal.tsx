import React from 'react'
import { Modal, Button, Form, message, Upload } from 'antd'
import PolicySupportApi from '@/services/PolicySupport.api'
import request from '@/utils/request';

class ImportModal extends React.Component<any, any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  
  state = {
    isShowImportModal: false,
    fileList: [],
    uploading: false
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  showModal = (id:any) => {
    this.setState({
      isShowImportModal: true,
      id: id
    });
  };

  handleCancel = () => {
    this.setState({
      isShowImportModal: false,
    });
  };

  handleOk = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });

    this.setState({
      uploading: true,
    });

    return request('/api/PolicySupport/FileUpload?PSID=' + this.props.PSID, {
      method: 'post',
      data: formData
    }).then((res) => {
      console.log('res: ', res)
      if (res.success) {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success(res.message);
        this.handleCancel()
        this.emitQuery()
      } else {
        message.error(res.message);
      }
    }).catch((err) => {
      this.setState({
        uploading: false,
      });
      message.error(err.message);
    })
  };

  render() {
    const { uploading, fileList } = this.state
    const uploadProps = {
      onRemove: (file:any) => {
        this.setState((state:any) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file:any) => {
        this.setState((state:any) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Modal
          title="文件上传"
          visible={this.state.isShowImportModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          <Form>
            <Upload {...uploadProps}>
              <Button type="primary" className="mb-10">导入</Button>
            </Upload>
            <p className="font-12 text-gray-9 pt-10">仅支持上传10M以内的文件</p>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ImportModal;
