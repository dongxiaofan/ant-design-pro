import React from 'react'

export const rosterListThead = [
  {
    title: '姓名',
    dataIndex: 'name',
    rules: [
      {
        required: true,
        message: '姓名为必填项',
      },
    ],
  },
  {
    title: '身份证号码',
    dataIndex: 'idCardNo',
    rules: [
      {
        required: true,
        message: '身份证号码为必填项',
      },
    ],
  },
  {
    title: '性别',
    dataIndex: 'sex',
    hideInSearch: true,
    valueEnum: {
      2: { text: '女'},
      1: { text: '男'}
    },
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    hideInSearch: true
  },
  {
    title: '在职状态',
    dataIndex: 'beHiring',
    valueEnum: {
      true: { text: '在职'  },
      false: { text: '离职' }
    },
    render: (text, record) => (
      <span>{record.beHiring == true ? '在职' : '离职'}</span>
    )
  },
  {
    title: '公司名称',
    dataIndex: 'companyName'
  },
  {
    title: '部门',
    dataIndex: 'department',
    hideInSearch: true
  },
  {
    title: '职业',
    dataIndex: 'duty',
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    sorter: true,
    valueType: 'dateTime',
    hideInForm: true,
  }
];

