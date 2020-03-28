import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Tag, Tooltip, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import RoleApi from '@/services/Role.api';
import CreateForm from './modal/CreateForm';

// 获取列表
const query = async (params:any) => {
  let resp = await RoleApi.getList(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

// 重置表格
const searchFn = async (actionRef:any) => {
  actionRef.current?.reload()
}

const configItem = [
  {key: 'type', formName: 'typeForm', title: '企业类型', list: []},
  {key: 'scope', formName: 'scopeForm', title: '企业规模', list: []},
  {key: 'industry', formName: 'industryForm', title: '所属行业', list: []},
]

const inputValue = ''

const OptionConfig: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);

  useEffect(() => {
  }, []);

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  return (
    <PageHeaderWrapper>
      {configItem.length ? configItem.map((item:any) => {
        return (
          <div className="base-title mb-10" key={item.key}>
            <span className="pr-20">{item.title}</span>
            <Button onClick={() => {handleShowCreateModal(item.formName)}}><PlusOutlined /> 添加</Button>
            <div></div>
          </div>
        )
      }) : null}

      {/* 新建/编辑弹窗 */}
      <CreateForm
        currentVal={currentVal}
        onCancel={() => handleCreateModalVisible(false)}
        showCreateModal={createModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default OptionConfig;