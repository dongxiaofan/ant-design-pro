import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { queryBill } from './service';

interface GithubIssueItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  body: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '生成日期',
    dataIndex: 'createdOn',
    valueType: 'date',
  },
  {
    title: '账单编号',
    dataIndex: 'areaGUID',
    copyable: true,
    // ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '服务企业',
    dataIndex: 'companyName',
  },
  {
    title: '人员数量（人）',
    hideInTable: true,
    dataIndex: 'areaName',
  },
  {
    title: '业务费合计（元）',
    dataIndex: 'securityNO',
  },
  {
    title: '服务费率',
    dataIndex: 'planName',
  },
  {
    title: '服务费（元）',
    dataIndex: 'createdName',
  },
  {
    title: '总计（元）',
    dataIndex: 'id',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row) => [
      <a href='#'>开具发票</a>,
      <a href='#'>删除</a>,
    ],
  },
];

export default () => (
  <PageHeaderWrapper>
    <ProTable<GithubIssueItem>
      columns={columns}
      request={params => queryBill(params)}
      rowKey="id"
      dateFormatter="string"
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  </PageHeaderWrapper>
);