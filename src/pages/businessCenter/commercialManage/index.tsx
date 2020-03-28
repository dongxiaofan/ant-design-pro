import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Dropdown, Menu } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import BuyForm from './modal/BuyForm';
import SetForm from './modal/SetForm';
import ModifyForm from './modal/ModifyForm';
import StopForm from './modal/StopForm';
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
  const [createModalVisible, handleBuyModalVisible] = useState<boolean>(false);
  const [setModalVisible, handleSetModalVisible] = useState<boolean>(false);
  const [stopModalVisible, handleStopModalVisible] = useState<boolean>(false);
  const [modifyModalVisible, handleModifyModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);

  useEffect(() => {
  }, []);

  // 显示弹窗-新增
  const handleShowBuyModal = (item: any) => {
    handleBuyModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-导入
  const handleShowSetModal = (item: any) => {
    handleSetModalVisible(true);
  }

  // 显示弹窗-签约
  const handleShowStopModal = (item: any) => {
    handleStopModalVisible(true);
  }

  // 显示弹窗-更改商保
  const handleShowModifyModal = (item: any) => {
    handleModifyModalVisible(true);
    setCurrentVal(item);
  }

  // 补充操作列且合并
  const option:any = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 240,
    fixed: 'right',
    render: (text:string, record:any) => (
      <div>
        <a onClick={() => handleShowStopModal(record)}>提前停保</a>
        <a onClick={() => handleShowModifyModal(record)}>更改人员</a>
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
          <Button type="primary" ghost onClick={() => handleShowSetModal(null)}>商保设置</Button>,
          <Button type="primary" onClick={() => handleShowBuyModal(null)}><PlusOutlined /> 购买商保</Button>
        ]}
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

      {/* 更改商保弹窗 */}
      <ModifyForm
        currentVal={currentVal}
        onCancel={() => handleModifyModalVisible(false)}
        showModifyModal={modifyModalVisible}
        query={() => searchFn(actionRef)}
      />

      {/* 提前停保弹窗 */}
      <StopForm
        currentVal={currentVal}
        onCancel={() => handleStopModalVisible(false)}
        showStopModal={stopModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default CustomerManage;