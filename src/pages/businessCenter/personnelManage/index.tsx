import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './modal/CreateForm';
import ImportForm from './modal/ImportForm';
import SignForm from './modal/SignForm';
import { TableListItem } from './data';

import { listThead } from './tableHead';
import RoleApi from '@/services/Role.api';
import SysAreaApi from '@/services/SysArea.api';

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

// 导出
const handleExport = async () => {
  message.success('你点击了导出')
}

// 重置表格
const searchFn = async (actionRef:any) => {
  actionRef.current?.reload()
}

const CustomerManage: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [signModalVisible, handleSignModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);
  const [areaTree, setAreaTree] = useState();

  useEffect(() => {
    getAreaTree()
  }, []);

  // 获取省市区树列表
  const getAreaTree = async () => {
    let resp = await SysAreaApi.getAreaTree()
    console.log('获取省市区树列表: ', resp)
    if (resp.success) {
      setAreaTree(resp.data)
    }
  }

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑客户' : '新增客户')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-导入
  const handleShowImportModal = (item: any) => {
    handleImportModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-签约
  const handleShowSignModal = (item: any) => {
    handleSignModalVisible(true);
    setCurrentVal(item);
  }

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (text:string, record:any) => (
      <div>
        <a onClick={() => handleShowSignModal(record)}>签约</a>
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

  return (
    <PageHeaderWrapper>
      <ProTable
        // headerTitle="查询表格"
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
          <Button onClick={() => handleExport()}>导出</Button>,
          <Button type="primary" ghost onClick={() => handleShowImportModal(null)}>导入</Button>,
          <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined /> 新建</Button>
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={params => query(params)} // 暂时隐藏
        columns={columns}
        rowSelection={{}}
      />

      {/* 新建/编辑弹窗 */}
      <CreateForm
        currentVal={currentVal}
        areaTree={areaTree}
        modalTitle={createModalTitle}
        onCancel={() => handleCreateModalVisible(false)}
        showCreateModal={createModalVisible}
        query={() => searchFn(actionRef)}
      />

      {/* 导入弹窗 */}
      <ImportForm
        onCancel={() => handleImportModalVisible(false)}
        showImportModal={importModalVisible}
        query={() => searchFn(actionRef)}
      />

      {/* 签约弹窗 */}
      <SignForm
        onCancel={() => handleSignModalVisible(false)}
        showSignModal={signModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default CustomerManage;