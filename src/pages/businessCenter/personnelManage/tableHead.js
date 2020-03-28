import React from 'react'

// 人员管理列表
export const listThead = [
  {
    title: '新增日期',
    dataIndex: 'aaa',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '新增日期为必填项' }],
  },
  {
    title: '姓名',
    dataIndex: 'bbb',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '姓名为必填项' }],
  },
  {
    title: '身份证',
    dataIndex: 'ccc',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '身份证为必填项' }],
  },
  {
    title: '开户行',
    dataIndex: 'ddd',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '开户行为必填项' }],
  },
  {
    title: '银行卡号',
    dataIndex: 'eee',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '银行卡号为必填项' }],
  },
  {
    title: '手机号码',
    dataIndex: 'fff',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '手机号码为必填项' }],
  },
  {
    title: '服务企业',
    dataIndex: 'ggg',
    width: 120,
    // hideInSearch: true,
    rules: [{ required: true, message: '服务企业为必填项' }],
  },
  {
    title: '服务项目',
    dataIndex: 'hhh',
    width: 120,
    // hideInSearch: true,
    rules: [{ required: true, message: '服务项目为必填项' }],
  },
  {
    title: '签约形式',
    dataIndex: 'iii',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '签约形式为必填项' }],
  },
  {
    title: '协议文本',
    dataIndex: 'jjj',
    width: 120,
    hideInSearch: true,
    render: (_, record) => (
      <a className="text-info" onClick={() => {console.log('点击了下载')}} >下载</a>
    ),
  },
  {
    title: '协议状态',
    dataIndex: 'kkk',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '协议状态为必填项' }],
  },
  {
    title: '商保状态',
    dataIndex: 'lll',
    width: 120,
    hideInSearch: true,
    rules: [{ required: true, message: '商保状态为必填项' }],
  }
];

