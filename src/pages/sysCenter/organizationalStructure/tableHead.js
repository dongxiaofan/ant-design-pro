import React from 'react'

// 部门管理列表
export const listThead = [
  {
    title: '部门名称',
    dataIndex: 'aaa',
    // hideInSearch: true,
    rules: [{ required: true, message: '部门名称为必填项' }],
  },
  {
    title: '上级部门',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '上级部门为必填项' }],
  },
  {
    title: '部门主管',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '部门主管为必填项' }],
  }
];

// 职位管理列表
export const positionThead = [
  {
    title: '部门',
    dataIndex: 'aaa',
    // hideInSearch: true,
    rules: [{ required: true, message: '部门为必填项' }],
  },
  {
    title: '职位名称',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '职位名称为必填项' }],
  },
  {
    title: '账号',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '账号为必填项' }],
  }
];

// 绑定员工列表
export const bindThead = [
  {
    title: '内部员工',
    dataIndex: 'aaa',
    // hideInSearch: true,
    rules: [{ required: true, message: '内部员工为必填项' }],
  },
  {
    title: '身份证',
    dataIndex: 'bbb',
    hideInSearch: true,
    rules: [{ required: true, message: '身份证为必填项' }],
  },
  {
    title: '账号',
    dataIndex: 'ccc',
    hideInSearch: true,
    rules: [{ required: true, message: '账号为必填项' }],
  }
];


