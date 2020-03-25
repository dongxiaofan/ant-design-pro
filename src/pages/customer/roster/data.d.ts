export interface TableListItem {
  id: string;
  name: string;
  idCardNo: number;
  sex: number;
  phone: number;
  beHiring?: boolean;
  companyName: string;
  department: number;
  duty: number;
  createTime: Date
}

export interface TableListPagination {
  pageIndex: number;
  pageSize: number;
  totalRows: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  name?: string;
  beHiring?: string;
  companyName?: string;
  idCardNo?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface FormDataType {
  name?:string;
  dataAccessRoleType?:string;
  operationRoleType?:string;
  productTypeArr?:string;
  enabled?:string;
  permissionIdList?:Array;
}
