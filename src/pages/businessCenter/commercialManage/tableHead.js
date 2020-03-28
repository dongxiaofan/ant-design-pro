import React from 'react'

// 商保管理列表
export const listThead = [
  {
    title: '姓名',
    dataIndex: 'aaa',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '姓名日期为必填项' }],
  },
  {
    title: '身份证',
    dataIndex: 'bbb',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '身份证为必填项' }],
  },
  {
    title: '服务企业',
    dataIndex: 'ccc',
    // hideInSearch: true,
    rules: [{ required: true, message: '服务企业为必填项' }],
  },
  {
    title: '服务项目',
    dataIndex: 'ddd',
    // hideInSearch: true,
    rules: [{ required: true, message: '服务项目为必填项' }],
  },
  {
    title: '签约状态',
    dataIndex: 'eee',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '签约状态为必填项' }],
  },
  {
    title: '商保名称',
    dataIndex: 'fff',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '商保名称为必填项' }],
  },
  {
    title: '商保价格',
    dataIndex: 'ggg',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '商保价格为必填项' }],
  },
  {
    title: '服务项目',
    dataIndex: 'hhh',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '服务项目为必填项' }],
  },
  {
    title: '购买日期',
    dataIndex: 'iii',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '购买日期为必填项' }],
  },
  {
    title: '保单编号',
    dataIndex: 'jjj',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '保单编号为必填项' }],
  },
  {
    title: '保险开始时间',
    dataIndex: 'kkk',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '保险开始时间为必填项' }],
  },
  {
    title: '保险结束时间',
    dataIndex: 'lll',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '保险结束时间为必填项' }],
  },
  {
    title: '保险总计费用（元）',
    dataIndex: 'lll',
    hideInSearch: true,
    width: 160,
    rules: [{ required: true, message: '保险总计费用（元）为必填项' }],
  },
  {
    title: '商保状态',
    dataIndex: 'lll',
    hideInSearch: true,
    width: 120,
    rules: [{ required: true, message: '商保状态为必填项' }],
  },
  {
    title: '保险公司退费（元）',
    dataIndex: 'lll',
    hideInSearch: true,
    width: 160,
    rules: [{ required: true, message: '保险公司退费（元）为必填项' }],
  }
];

export const setFormThead = [
  {
    title: '添加日期',
    dataIndex: 'aaa',
    ellipsis: true,
    valueType: 'dateTime',
    width: 100
  },
  {
    title: '商保名称',
    dataIndex: 'bbb',
    ellipsis: true
  },
  {
    title: '商保价格',
    dataIndex: 'ccc',
    ellipsis: true,
    // render: (_, record) => (
    //   {
    //   }
    //   // <span>{record.ccc} + 🌺 + {record.ddd}</span>
    // )
    render: (h, record) => {
      let arr = ['元/天', '元/月', '元/年']
      return <span>{record.ccc}{arr[record.ddd]}</span>
    }
  },
  {
    title: '商保资料',
    dataIndex: 'eee',
    ellipsis: true
  }
]

