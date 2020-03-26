import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateCustomerForm from './modal/CreateCustomerForm';
import { TableListItem, FormDataType } from './data';

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

// 重置表格
const searchFn = async (actionRef:any) => {
  actionRef.current?.reload()
}

const CustomerManage: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState<Partial<FormDataType> | undefined>(undefined);

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑客户' : '新增客户')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (text:string, record:any) => (
      <div>
        <Popconfirm
          title="是否确定删除？"
          onConfirm={async () => {
            const resp = await RoleApi.delete({id: record.id});
            if (resp.success) {
              message.success(resp.message)
              actionRef.current?.reload()
            } else {
              message.error(resp.message)
            }
          }}
          okText="确认"
          cancelText="取消">
          <a>删除</a>
        </Popconfirm>
        <a onClick={() => handleShowCreateModal(record)}>编辑</a>
      </div>
    ),
  }
  const columns:any = listThead.concat(option)

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询表格"
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
          <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined /> 新建</Button>
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        // request={params => query(params)} // 暂时隐藏
        columns={columns}
        rowSelection={{}}
      />

      {/* 新建/编辑弹窗 */}
      <CreateCustomerForm currentVal={currentVal} modalTitle={createModalTitle} onCancel={() => handleCreateModalVisible(false)} showCreateModal={createModalVisible} query={() => searchFn(actionRef)} />
    </PageHeaderWrapper>
  );
}

export default CustomerManage;