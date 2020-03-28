export interface TableListItem {
  aaa: date;
  bbb: string;
  ccc: string;
  ddd: number;
  eee: number;
  fff: string;
  ggg: array;
  hhh: string;
  iii: string;
  jjj: string;
  kkk: date;
  lll: date;
  mmm: string;
  nnn: string
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
  aaa: date;
  bbb: string;
  ccc: string;
  ddd: number;
  eee: number;
  fff: string;
  ggg: array;
  hhh: string;
  iii: string;
  jjj: string;
  kkk: date;
  lll: date;
  mmm: string;
  nnn: string
}
