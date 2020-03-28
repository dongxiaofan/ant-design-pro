import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Tabs, Tree } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import tool from '@/lib/tool'

import CreateForm from './modal/CreateForm';
import BindForm from './modal/BindForm';
import { TableListItem } from './data';

import { listThead, positionThead } from './tableHead';
import RoleApi from '@/services/Role.api';
import PolicySupportApi from '@/services/PolicySupport.api';

const { TabPane } = Tabs;
const { TreeNode } = Tree;

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

const OrganizationalStructure: React.FC<{}> = () => {
  const [sorter, setSorter, ] = useState<string>('');
  const [createModalTitle, setCreateModalTitle] = useState<string>('');
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [bindModalVisible, handleBindModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentVal, setCurrentVal] = useState(undefined);
  const [currentTabVal, setCurrentTabVal] = useState(undefined);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    getOrganizationUnitTree()
  }, []);

  // 获取组织架构树
  const getOrganizationUnitTree = async () => {
    let res = await PolicySupportApi.getOrganizationUnitTree({})
    console.log('获取组织架构 res: ', res)
    const arr = tool.getTree(res)
    console.log('获取组织架构 arr: ', arr)
    setTreeData(arr)
  }

  // 显示弹窗-新增/编辑
  const handleShowCreateModal = (item: any) => {
    setCreateModalTitle(item ? '编辑' : '新建')
    handleCreateModalVisible(true);
    setCurrentVal(item);
  }

  // 显示弹窗-绑定员工
  const handleShowBindModal = (item: any) => {
    handleBindModalVisible(true);
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
    width: 200,
    fixed: 'right',
    render: (text:string, record:any) => (
      <div>
        <a onClick={() => handleShowBindModal(record)}>绑定员工</a>
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
  // const columns:any = listThead.concat(option)
  const scroll:any = {x: 'true'}

  return (
    <PageHeaderWrapper>
      <div className="ant-row">
        <div className="ant-col ant-col-6 pr-20">
          <Tree
            // checkable
            showLine
            defaultExpandParent
            autoExpandParent
            treeData={treeData}
            className="pall-10"
          />
        </div>

        <div className="ant-col ant-col-18">
          <Tabs animated={false} onChange={handleTabChange}>
            <TabPane tab="部门管理" key="company">
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
                columns={listThead.concat(option)}
              />
            </TabPane>

            <TabPane tab="职位管理" key="user">
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
                columns={positionThead.concat(option)}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      {/* 新建/编辑弹窗 */}
      <CreateForm
        currentVal={currentVal}
        modalTitle={createModalTitle}
        onCancel={() => handleCreateModalVisible(false)}
        showCreateModal={createModalVisible}
        query={() => searchFn(actionRef)}
      />

      {/* 绑定弹窗 */}
      <BindForm
        currentVal={currentVal}
        onCancel={() => handleBindModalVisible(false)}
        showBindModal={bindModalVisible}
        query={() => searchFn(actionRef)}
      />
    </PageHeaderWrapper>
  );
}

export default OrganizationalStructure;