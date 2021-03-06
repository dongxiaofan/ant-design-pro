export interface TableListItem {
  aaa: string;
  bbb: string;
  ccc: string;
  ddd: string;
  eee: string;
  fff: string;
  ggg: array;
  hhh: string;
  iii: string
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
  aaa: string;
  bbb: string;
  ccc: string;
  ddd: string;
  eee: string;
  fff: string;
  ggg: array;
  hhh: string;
  iii: string
}
