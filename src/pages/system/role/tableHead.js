import React from 'react'

export const roleListThead = [
  {
    title: '角色名称',
    dataIndex: 'name',
    rules: [
      {
        required: true,
        message: '角色名称为必填项',
      },
    ],
  },
  {
    title: '角色状态',
    dataIndex: 'enabled',
    hideInSearch: true,
    // hideInForm: true,
    valueEnum: {
      true: { text: '启用', status: 'Success'},
      false: { text: '禁用', status: 'Error'}
    },
    rules: [
      {
        required: true,
        message: '角色状态为必填项',
      },
    ],
  },
  {
    title: '数据权限',
    dataIndex: 'dataAccessRoleType',
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '数据权限为必填项',
      },
    ],
  },
  {
    title: '角色分类',
    dataIndex: 'operationRoleType',
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'createdOn',
    hideInSearch: true,
    sorter: true,
    valueType: 'dateTime'
  }
];

