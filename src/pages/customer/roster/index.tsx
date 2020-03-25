import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateRosterForm from './components/CreateRosterForm';
import ImportForm from './components/ImportForm';
import { TableListItem, FormDataType } from './data';

import { roleListThead } from './tableHead'
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

// 批量导入
const handleImport = () => {}

const Roster: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState<Partial<FormDataType> | undefined>(undefined);

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑角色' : '新增角色')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-导入
  const handleShowImportModal = () => {
    console.log('点击了批量导入')
    handleImportModalVisible(true);
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
          <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined /> 新建</Button>,
          <Dropdown
            overlay={
              <Menu
                onClick={async e => {
                  if (e.key === 'import') {
                    await handleShowImportModal();
                    action.reload();
                  }
                }}
                selectedKeys={[]}
              >
                <Menu.Item key="import">批量导入</Menu.Item>
              </Menu>
            }
          >
            <Button>批量操作</Button>
        </Dropdown>
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

      {/* 新建/编辑弹窗 */}
      <CreateRosterForm currentVal={currentVal} modalTitle={createModalTitle} onCancel={() => handleCreateModalVisible(false)} showCreateModal={createModalVisible} query={() => searchFn(actionRef)} />
      {/* 批量导入弹窗 */}
      <ImportForm onCancel={() => handleImportModalVisible(false)} showImportModal={importModalVisible} query={() => searchFn(actionRef)} />
    </PageHeaderWrapper>
  );
};

export default Roster;
