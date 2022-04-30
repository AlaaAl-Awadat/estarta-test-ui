import { ReactNode } from 'react';

export interface TableOptionsInterface {
  pageSizeOptions?: number[];
  tableSize?: 'small' | 'medium';
  dateFormat?: string;
  sortFrom?: 1 | 2; // 1 for front-end sort & 2 for backend sort
}
export interface HeaderDataInterface {
  id: number;
  isHidden?: boolean;
  isSortable?: boolean;
  label: string;
  input?: string;
  isDate?: boolean;
  cellClasses?: string;
  dateFormat?: string;
  component?: (
    option: object,
    index: number,
    column: HeaderDataInterface,
    columnIndex: number
  ) => ReactNode | string | string | number |boolean;
  headerComponent?: (option: object, index: number) => ReactNode | string | number |boolean;
}
export interface FooterDataInterface {
  colSpan?: number;
  component?: (item: FooterDataInterface, index: number) => ReactNode | string;
  value: string | number |boolean;
}
export interface TableInterface {
  tableOptions: TableOptionsInterface;
  parentTranslationPath?: string;
  sharedTranslationPath?: string;
  translationPath?: string;
  data: object[];
  headerData?: HeaderDataInterface[];
  footerData?: FooterDataInterface[];
  sortColumnClicked?: (columnId: number) => void;
  dateFormat?: string;
  headerRowRef: string;
  bodyRowRef: string;
  isWithEmpty: boolean;
  message?: string;
  defaultMessage?: string;
  isLoading: boolean;
  paginationIdRef?: string;
  onPageIndexChanged?: (pageIndex: number) => void;
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  onPageSizeChanged?: (pageIndex: number) => void;
  isDynamicDate: boolean;
}
