import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryBill(params?: TableListParams) {
  return request('/api/SysWelfarePercentNoConfig/GetList', {
    method: 'POST',
    data: params
  })
}
