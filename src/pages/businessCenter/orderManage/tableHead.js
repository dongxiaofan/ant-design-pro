import React from 'react'

// 订单管理列表
export const listThead = [
  {
    title: '发布日期',
    dataIndex: 'aaa',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '发布日期为必填项' }],
  },
  {
    title: '订单名称',
    dataIndex: 'bbb',
    width: 120,
    // hideInSearch: true,
    rules: [{ required: true, message: '订单名称为必填项' }],
  },
  {
    title: '需求人数',
    dataIndex: 'ccc',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '需求人数为必填项' }],
  },
  {
    title: '订单价格',
    dataIndex: 'ddd',
    width: 160,
    hideInSearch: true,
    rules: [{ required: true, message: '订单价格为必填项' }],
  },
  {
    title: '订单内容',
    dataIndex: 'eee',
    width: 160,
    hideInSearch: true,
    rules: [{ required: true, message: '订单内容为必填项' }],
  },
  {
    title: '所属客户',
    dataIndex: 'fff',
    width: 120,
    // hideInSearch: true,
    rules: [{ required: true, message: '所属客户为必填项' }],
  },
  {
    title: '所属项目',
    dataIndex: 'ggg',
    width: 120,
    // hideInSearch: true,
    rules: [{ required: true, message: '所属项目为必填项' }],
  },
  {
    title: '接单人员',
    dataIndex: 'hhh',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '接单人员为必填项' }],
  },
  {
    title: '订单状态',
    dataIndex: 'iii',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '订单状态为必填项' }],
  }
];

// 派单
export const sendFormThead = [
  {
    title: '姓名',
    dataIndex: 'aaa',
    width: 120,
    hideInSearch: true
  },
  {
    title: '身份证',
    dataIndex: 'bbb',
    width: 120,
    hideInSearch: true
  },
  {
    title: '服务企业',
    dataIndex: 'ccc',
    width: 120,
    // hideInSearch: true
  },
  {
    title: '服务项目',
    dataIndex: 'ddd',
    width: 120,
    // hideInSearch: true
  },
  {
    title: '协议状态',
    dataIndex: 'eee',
    width: 120,
    hideInSearch: true
  },
  {
    title: '商保状态',
    dataIndex: 'fff',
    width: 120,
    hideInSearch: true
  }
]

