import { ChangeEvent, CSSProperties } from "react";
import {
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TableToggleHideAllColumnProps,
} from "react-table";

export type TableProps = {
  // TODO: change this to specific type
  data: any[];
  columns: Column[];
  title?: string;
  footerText?: string;
  checkbox?: boolean;
  currentPage?: number;
  rowsPerPage?: number;
  totalPages?: number;
  pageSizes?: number[];
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  isLoading?: boolean;
};

export type TableInfoProps = {
  title?: string;
  allColumns: ColumnInstance<object>[];
  getToggleHideAllColumnsProps: (
    props?: Partial<TableToggleHideAllColumnProps> | undefined,
  ) => TableToggleHideAllColumnProps;
};

export type ColumnSelectorProps = {
  allColumns: ColumnInstance<object>[];
  getToggleHideAllColumnsProps: (
    props?: Partial<TableToggleHideAllColumnProps> | undefined,
  ) => TableToggleHideAllColumnProps;
};

export type TableCheckboxProps = {
  onChange?: ((e: ChangeEvent<Element>) => void) | undefined;
  checked?: boolean | undefined;
  title?: string | undefined;
  indeterminate?: boolean | undefined;
  style?: CSSProperties | undefined;
  className?: string | undefined;
  role?: string | undefined;
};

export type TableHeaderProps = {
  headerGroups: HeaderGroup<object>[];
  setColumnOrder: (updater: string[] | ((columnOrder: string[]) => string[])) => void;
  allColumns: ColumnInstance<object>[];
};

export type FiltersProps = {
  column: HeaderGroup<object>;
};

export type TablePropsBody = {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<object> | undefined) => TableBodyProps;
  prepareRow: (row: Row<object>) => void;
  page: Row<object>[];
};

export type TableFooterProps = {
  pageOptions: number[];
  footerText?: string;
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  pageSizes: number[];
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
};

export type FooterInfoProps = {
  footerText?: string;
};

export type FooterPaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSizes: number[];
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
};
