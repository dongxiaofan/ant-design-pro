import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateRosterForm from './components/CreateRosterForm';
import { TableListItem } from './data';
import EmployeesApi from '@/services/Employees.api'

import { rosterListThead } from './tableHead'
import RoleApi from '@/services/Role.api';

const query = async (params:any) => {
  let resp = await EmployeesApi.getEmployeeListNew(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

// 重置表格
const searchFn = async (actionRef:any) => {
  actionRef.current?.reload()
}

const Roster: React.FC<{}> = () => {
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
            const resp = await EmployeesApi.deleteEmployee({id: record.id});
            if (resp.success) {
              message.success(resp.message)
              actionRef.current?.reload();
            } else {
              message.error(resp.message)
            }
          }}
          okText="确认"
          cancelText="取消">
          <a href="#">删除</a>
        </Popconfirm>
      </div>
    ),
  }
  const columns:any = rosterListThead.concat(option)

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

      <CreateRosterForm onCancel={() => handleModalVisible(false)} showModal={createModalVisible} query={() => searchFn(actionRef)} />
    </PageHeaderWrapper>
  );
};

export default Roster;
