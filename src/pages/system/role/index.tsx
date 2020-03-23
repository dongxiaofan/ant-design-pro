import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateRoleModal from './components/CreateRoleModal';
import { TableListItem } from './data';
import UserApi from '@/services/User.api'

import { roleListThead } from './tableHead'

const query = async (params:any) => {
  let resp = await UserApi.getList(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

const handleEnabledList = async (id:string, enabled:boolean, actionRef:any) => {
  var params = {
    ids: id,
    enabled: enabled
  }
  let resp = await UserApi.enabledList(params)
  if (resp.success) {
    message.success(resp.message)
    actionRef.current?.reload()
  } else {
    message.error(resp.message)
  }
}

const handleShowCreateRoleModal = () => {
  console.log('xxxxxxxxxxxxx')
}

const RoleList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (text:string, record:any) => (
      <div>
        <Popconfirm
          title="是否确定删除？"
          onConfirm={async () => {
            const resp = await UserApi.handleDelete({id: record.id});
            if (resp.success) {
              message.success(resp.message)
              actionRef.current?.reload();
            } else {
              message.error(resp.message)
            }
          }}
          okText="确认"
          cancelText="取消">
          <Button type="link">删除</Button>
        </Popconfirm>
          
        {
          record.enabled ?
          <a onClick={()=>{handleEnabledList(record.id, false, actionRef)}}>禁用</a>
          :
          <a onClick={()=>{handleEnabledList(record.id, true, actionRef)}}>启用</a>
        }
      </div>
    ),
  }
  const columns:any = roleListThead.concat(option)

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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={params => query(params)}
        columns={columns}
        rowSelection={{}}
      />

      <CreateRoleModal onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async value => {
            console.log('🌺 value: ', value)
          }}
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateRoleModal>
    </PageHeaderWrapper>
  );
};

export default RoleList;
