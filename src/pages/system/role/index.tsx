import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import { TableListItem } from './data';
import { roleListThead } from './tableHead';
import RoleApi from '@/services/Role.api';

import CreateRoleModal from './components/CreateRoleModal';

// 弹窗集
let modals = ['createRoleModal']

const RoleList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');

  const onRef = (ref:any, modal:any) => { // -> 获取整个Child元素
    modals[modal] = ref
  };

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
  
  // 启用/禁用操作
  const handleEnabledList = async (id:string, enabled:boolean, actionRef:any) => {
    var params = {
      ids: id,
      enabled: enabled
    }
    let resp = await RoleApi.enabledList(params)
    if (resp.success) {
      message.success(resp.message)
      actionRef.current?.reload()
    } else {
      message.error(resp.message)
    }
  }

  // 显示弹窗-新建/编辑
  const handleShowCreateRoleModal = (id:string) => {
    modals['createRoleModal'].getModel(id)
    // modals['createRoleModal'].show()
  }
  
  // Pro-Table action
  const actionRef = useRef<ActionType>();

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
        <a onClick={() => handleShowCreateRoleModal(record.id)}>编辑</a>
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
          <Button type="primary" onClick={() => handleShowCreateRoleModal('')}>
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

      {/* 弹窗 */}
      <CreateRoleModal onRef={(ref:any) => onRef(ref, 'createRoleModal')} query={() => searchFn(actionRef)} />
    </PageHeaderWrapper>
  )
}

export default RoleList;
