import React from 'react'

// 人员管理列表
export const listThead = [
  {
    title: '新增日期',
    dataIndex: 'aaa',
    hideInSearch: true,
    rules: [{ required: true, message: '新增日期为必填项' }],
  },
  {
    title: '姓名',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '姓名为必填项' }],
  },
  {
    title: '身份证',
    dataIndex: 'ccc',
    hideInSearch: true,
    rules: [{ required: true, message: '身份证为必填项' }],
  },
  {
    title: '开户行',
    dataIndex: 'ddd',
    hideInSearch: true,
    rules: [{ required: true, message: '开户行为必填项' }],
  },
  {
    title: '银行卡号',
    dataIndex: 'eee',
    hideInSearch: true,
    rules: [{ required: true, message: '银行卡号为必填项' }],
  },
  {
    title: '手机号码',
    dataIndex: 'fff',
    hideInSearch: true,
    rules: [{ required: true, message: '手机号码为必填项' }],
  },
  {
    title: '服务企业',
    dataIndex: 'ggg',
    // hideInSearch: true,
    rules: [{ required: true, message: '服务企业为必填项' }],
  },
  {
    title: '服务项目',
    dataIndex: 'hhh',
    // hideInSearch: true,
    rules: [{ required: true, message: '服务项目为必填项' }],
  },
  {
    title: '签约形式',
    dataIndex: 'iii',
    hideInSearch: true,
    rules: [{ required: true, message: '签约形式为必填项' }],
  },
  {
    title: '协议文本',
    dataIndex: 'jjj',
    hideInSearch: true,
    render: (_, record) => (
      <a className="text-info" onClick={() => {console.log('点击了下载')}} >下载</a>
    ),
  },
  {
    title: '协议状态',
    dataIndex: 'kkk',
    hideInSearch: true,
    rules: [{ required: true, message: '协议状态为必填项' }],
  },
  {
    title: '商保状态',
    dataIndex: 'lll',
    hideInSearch: true,
    rules: [{ required: true, message: '商保状态为必填项' }],
  }
];

