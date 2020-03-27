import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import BuyForm from './modal/BuyForm';
import SetForm from './modal/SetForm';
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
  const [createModalVisible, handleBuyModalVisible] = useState<boolean>(false);
  const [setModalVisible, handleSetModalVisible] = useState<boolean>(false);
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
  const handleShowBuyModal = (item: any) => {
    setCreateModalTitle(item ? '编辑客户' : '新增客户')
    handleBuyModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-导入
  const handleShowSetModal = (item: any) => {
    handleSetModalVisible(true);
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
    width: 240,
    render: (text:string, record:any) => (
      <div>
        <a onClick={() => handleShowSignModal(record)}>提前停保</a>
        <a onClick={() => handleShowBuyModal(record)}>更改人员</a>
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
          <Button type="primary" ghost onClick={() => handleShowSetModal(null)}>商保设置</Button>,
          <Button type="primary" onClick={() => handleShowBuyModal(null)}><PlusOutlined /> 购买商保</Button>
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

      {/* 购买商保弹窗 */}
      <BuyForm
        onCancel={() => handleBuyModalVisible(false)}
        showBuyModal={createModalVisible}
        query={() => searchFn(actionRef)}
      />

      {/* 商保设置弹窗 */}
      <SetForm
        onCancel={() => handleSetModalVisible(false)}
        showSetModal={setModalVisible}
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