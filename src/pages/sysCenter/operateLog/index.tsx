import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';

import { listThead } from './tableHead';
import RoleApi from '@/services/Role.api';

// 获取列表
const query = async (params:any) => {
  let resp = await RoleApi.getList(params)
  if (resp.success) {
    resp.total = resp.totalRows
    return resp
  }
}

const OperateLog: React.FC<{}> = () => {
  useEffect(() => {
  }, []);

  return (
    <PageHeaderWrapper>
      <ProTable
        // headerTitle="查询表格"
        rowKey="id"
        request={params => query(params)} // 暂时隐藏
        columns={listThead}
        options={false}
        search={false}
      />
    </PageHeaderWrapper>
  );
}

export default OperateLog;