import React from 'react';
import { Modal } from 'antd';

interface CreateRoleModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = props => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="弹窗范例"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {/* {props.children} */}
      <p>xxxxxxxxxx</p>
    </Modal>
  );
};

export default CreateRoleModal;
