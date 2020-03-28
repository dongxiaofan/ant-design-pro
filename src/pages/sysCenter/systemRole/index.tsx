import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './modal/CreateForm';
import { TableListItem } from './data';

import { listThead } from './tableHead';
import RoleApi from '@/services/Role.api';

// 获取列表
const query = async (params:any) => {
  let resp = await RoleApi.getList(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

// 删除单条记录
const handleDelete = async (params:any, actionRef:any) => {
  let resp = await RoleApi.delete(params)
  if (resp.success) {
    message.success(resp.message)
    actionRef.current?.reload()
  } else {
    message.error(resp.message)
  }
}

// 重置表格
const searchFn = async (actionRef:any) => {
  actionRef.current?.reload()
}

const SystemRole: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);

  useEffect(() => {
  }, []);

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑角色' : '新建角色')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 180,
    fixed: 'right',
    render: (text:string, record:any) => (
      <div>
        <a onClick={() => handleShowCreateModal(record)}>编辑</a>
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
  const columns:any = listThead.concat(option)
  const scroll:any = {x: 'true'}

  return (
    <PageHeaderWrapper>
      <ProTable
        // headerTitle="查询表格"
        scroll={scroll}
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{}}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined />新建</Button>
        ]}
        request={params => query(params)} // 暂时隐藏
        columns={columns}
        rowSelection={{}}
      />

      {/* 新建/编辑弹窗 */}
      <CreateForm
        currentVal={currentVal}
        modalTitle={createModalTitle}
        onCancel={() => handleCreateModalVisible(false)}
        showCreateModal={createModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default SystemRole;