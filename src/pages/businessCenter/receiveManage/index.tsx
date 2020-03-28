import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu, Tabs } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './modal/CreateForm';
import ImportForm from './modal/ImportForm';
import GenerateBillForm from './modal/GenerateBillform';
import { TableListItem } from './data';

import { listThead, billThead } from './tableHead';
import RoleApi from '@/services/Role.api';

const { TabPane } = Tabs;

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

const ReceiveManage: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [sendModalVisible, handleGenerateBillModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);
  const [currentTabVal, setCurrentTabVal] = useState(undefined);

  useEffect(() => {
  }, []);

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑订单完成数据' : '新建订单完成数据')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-导入
  const handleShowImportModal = (item: any) => {
    handleImportModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-生成账单
  const handleShowGenerateBillModal = (item: any) => {
    handleGenerateBillModalVisible(true);
    setCurrentVal(item);
  }

  // tabs切换
  const handleTabChange = (val:any) => {
    console.log('tabs切换: ', val)
    setCurrentTabVal(val)
  }

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 120,
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
      <Tabs animated={false} onChange={handleTabChange}>
        <TabPane tab="新增订单完成数据" key="running">
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
            params={{status: currentTabVal}}
            toolBarRender={(action, { selectedRows }) => [
              <Button onClick={() => handleShowGenerateBillModal(null)}>生成账单</Button>,
              <Button type="primary" ghost onClick={() => handleShowImportModal(null)}>导入</Button>,
              <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined />新建</Button>
            ]}
            request={params => query(params)} // 暂时隐藏
            columns={columns}
            rowSelection={{}}
          />
        </TabPane>

        <TabPane tab="已生成的账单" key="error">
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
            params={{status: currentTabVal}}
            request={params => query(params)} // 暂时隐藏
            columns={billThead}
            search={false}
          />
        </TabPane>
      </Tabs>

      {/* <ProTable
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
        params={{status: currentTabVal}}
        toolBarRender={(action, { selectedRows }) => [
          <Button onClick={() => handleShowGenerateBillModal(null)}>生成账单</Button>,
          <Button type="primary" ghost onClick={() => handleShowImportModal(null)}>导入</Button>,
          <Button type="primary" onClick={() => handleShowCreateModal(null)}><PlusOutlined />新建</Button>
        ]}
        request={params => query(params)} // 暂时隐藏
        columns={columns}
        rowSelection={{}}
      /> */}

      {/* 新建/编辑弹窗 */}
      <CreateForm
        currentVal={currentVal}
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

      {/* 派单弹窗 */}
      <GenerateBillForm
        currentVal={currentVal}
        onCancel={() => handleGenerateBillModalVisible(false)}
        showGenerateBillModal={sendModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default ReceiveManage;