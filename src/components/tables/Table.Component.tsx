// noinspection JSCheckFunctionSignatures

import React, { useCallback, useState, useRef, memo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import './Table.Style.scss';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { PaginationEnum } from '../../enums';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import PaginationComponent from '../pagination/Pagination.Component';
import { getDataFromObject, GlobalDisplayDateTimeFormat } from '../../helpers';
import { HeaderDataInterface, TableInterface } from '../../interfaces';
import EmptyComponent from '../empty/Empty.Component';

const TableComponent = ({
  tableOptions,
  parentTranslationPath,
  sharedTranslationPath,
  translationPath,
  data,
  headerData,
  footerData,
  sortColumnClicked,
  dateFormat,
  headerRowRef,
  bodyRowRef,
  isWithEmpty,
  message,
  defaultMessage,
  isLoading,
  paginationIdRef,
  onPageIndexChanged,
  totalItems,
  pageIndex,
  pageSize,
  onPageSizeChanged,
  isDynamicDate,
}: TableInterface): ReactElement | null => {
  const { t } = useTranslation<string>(parentTranslationPath);
  const [currentOrderById, setCurrentOrderById] = useState<number>(-1);
  const [currentOrderDirection, setCurrentOrderDirection] = useState<'desc' | 'asc'>('desc');
  const tableRef = useRef(null);
  const descendingComparator = (a: object, b: object, orderBy: string): number => {
    if (b[orderBy as keyof typeof b] < a[orderBy as keyof typeof a]) return -1;
    if (b[orderBy as keyof typeof b] > a[orderBy as keyof typeof a]) return 1;
    return 0;
  };
  const getComparator = (
    order: 'desc' | 'asc',
    orderBy: string | undefined
  ): ((a: object, b: object) => number) => {
    if (!orderBy) return () => 0;
    return order === 'desc'
      ? (a, b): number => descendingComparator(a, b, orderBy)
      : (a, b): number => -descendingComparator(a, b, orderBy);
  };
  const createSortHandler = useCallback(
    (columnId: number): VoidFunction =>
      (): void => {
        if (!tableOptions) return;
        if (tableOptions.sortFrom === 2 && sortColumnClicked) {
          sortColumnClicked(columnId);
          return;
        }
        setCurrentOrderDirection((item) => (item === 'desc' ? 'asc' : 'desc'));
        setCurrentOrderById(columnId);
      },
    [tableOptions, sortColumnClicked]
  );
  const stableSort = (array: object[], comparator: (a: object, b: object) => number): object[] => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: (object | number)[], b: (object | number)[]) => {
      const order = comparator(a[0] as object, b[0] as object);
      if (order !== 0) return order;
      return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]) as object[];
  };
  const getSortDataName = (): string | undefined => {
    const currentHeader: HeaderDataInterface | undefined =
      headerData && headerData.find((item) => item.id === currentOrderById);
    if (currentHeader) return currentHeader.input;
    return undefined;
  };

  return (
    (((isWithEmpty && totalItems === 0) || isLoading || totalItems > 0) && (
      <div className={`tables-content-wrapper`} ref={tableRef}>
        <div className="tables-content">
          <div className="table-responsive">
            {headerData && headerData.length > 0 && (
              <TableContainer>
                <Table
                  className="table-wrapper"
                  aria-labelledby="tableTitle"
                  size={tableOptions.tableSize} // 'small' or 'medium'
                  aria-label="enhanced table"
                >
                  <TableHead>
                    <TableRow>
                      {headerData
                        .filter((column) => !column.isHidden)
                        .map((item, index) => (
                          <TableCell
                            key={`${headerRowRef}${index + 1}`}
                            sortDirection={
                              item.isSortable && currentOrderById === item.id
                                ? currentOrderDirection
                                : false
                            }
                            id={`${headerRowRef}${index + 1}`}
                          >
                            {item.isSortable ? (
                              <TableSortLabel
                                active={currentOrderById === item.id}
                                direction={
                                  currentOrderById === item.id ? currentOrderDirection : 'desc'
                                }
                                onClick={createSortHandler(item.id)}
                              >
                                {(item.headerComponent && item.headerComponent(item, index)) ||
                                  (item.label && t(`${translationPath}${item.label}`)) ||
                                  t('Shared:actions')}
                              </TableSortLabel>
                            ) : (
                              (item.headerComponent && item.headerComponent(item, index)) ||
                              t(`${translationPath}${item.label}`)
                            )}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  {!isLoading && (
                    <TableBody>
                      {stableSort(data, getComparator(currentOrderDirection, getSortDataName()))
                        .slice(
                          ((onPageIndexChanged || onPageSizeChanged) && data.length <= pageSize
                            ? 0
                            : pageIndex * pageSize) || 0,
                          ((onPageIndexChanged || onPageSizeChanged) && data.length <= pageSize
                            ? pageSize
                            : pageIndex * pageSize + pageSize) || data.length
                        )
                        .map((row: object, rowIndex: number) => (
                          <React.Fragment key={`bodyRow${rowIndex * (pageIndex + 1)}`}>
                            <TableRow
                              role="checkbox"
                              tabIndex={-1}
                              id={`${bodyRowRef}${rowIndex * (pageIndex + 1)}`}
                            >
                              {headerData.length > 0 &&
                                headerData
                                  .filter((column) => !column.isHidden)
                                  .map((column, columnIndex) => (
                                    <TableCell
                                      key={`bodyColumn${columnIndex * (pageIndex + 1) + rowIndex}`}
                                      className={column.cellClasses || ''}
                                    >
                                      <>
                                        {((column.isDate ||
                                          (isDynamicDate &&
                                            getDataFromObject(row, column.input) &&
                                            isNaN(getDataFromObject(row, column.input) as number) &&
                                            moment(
                                              getDataFromObject(row, column.input) as string,
                                              moment.ISO_8601
                                            ).isValid())) &&
                                          ((getDataFromObject(row, column.input) &&
                                            moment(
                                              getDataFromObject(row, column.input) as string,
                                              moment.ISO_8601
                                            ).isValid() &&
                                            moment(getDataFromObject(row, column.input) as string)
                                              .locale(i18next.language)
                                              .format(
                                                column.dateFormat ||
                                                  tableOptions.dateFormat ||
                                                  dateFormat
                                              )) ||
                                            '')) ||
                                          (column.component &&
                                            column.component(row, rowIndex, column, columnIndex)) ||
                                          getDataFromObject(row, column.input)}
                                      </>
                                    </TableCell>
                                  ))}
                            </TableRow>
                          </React.Fragment>
                        ))}
                    </TableBody>
                  )}
                  {footerData && footerData.length > 0 && (
                    <TableFooter className="footer-wrapper">
                      <TableRow>
                        {footerData.map((item, index) => (
                          <TableCell colSpan={item.colSpan} key={`footerCell${index + 1}`}>
                            {(item.component && item.component(item, index)) || item.value}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableFooter>
                  )}
                </Table>
              </TableContainer>
            )}
            {isWithEmpty && totalItems === 0 && !isLoading && (
              <EmptyComponent
                message={message}
                parentTranslationPath={parentTranslationPath}
                translationPath={translationPath}
                sharedTranslationPath={sharedTranslationPath}
                defaultMessage={defaultMessage}
              />
            )}
            {(onPageIndexChanged || onPageSizeChanged) &&
              totalItems > PaginationEnum['10'].value && (
                <PaginationComponent
                  idRef={paginationIdRef}
                  isReversedSections
                  isRemoveTexts
                  totalCount={totalItems}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageIndexChanged={onPageIndexChanged}
                  onPageSizeChanged={onPageSizeChanged}
                />
              )}
          </div>
        </div>
      </div>
    )) ||
    null
  );
};

TableComponent.propTypes = {
  tableOptions: PropTypes.shape({
    pageSizeOptions: PropTypes.instanceOf(Array),
    tableSize: PropTypes.oneOf(['small', 'medium']),
    dateFormat: PropTypes.string,
    sortFrom: PropTypes.number,
  }),
  translationPath: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  sharedTranslationPath: PropTypes.string,
  dateFormat: PropTypes.string,
  sortColumnClicked: PropTypes.func,
  headerData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      isHidden: PropTypes.bool,
      isSortable: PropTypes.bool,
      label: PropTypes.string,
      input: PropTypes.string,
      isDate: PropTypes.bool,
      cellClasses: PropTypes.string,
      component: PropTypes.func, // from row
      headerComponent: PropTypes.func, // from header map
    })
  ),
  data: PropTypes.instanceOf(Array),
  footerData: PropTypes.arrayOf(
    PropTypes.shape({
      colSpan: PropTypes.number,
      component: PropTypes.func,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
        PropTypes.bool,
      ]),
    })
  ),
  headerRowRef: PropTypes.string,
  bodyRowRef: PropTypes.string,
  isLoading: PropTypes.bool,
  isWithEmpty: PropTypes.bool,
  defaultMessage: PropTypes.string,
  message: PropTypes.string,
  // pagination
  paginationIdRef: PropTypes.string,
  onPageIndexChanged: PropTypes.func,
  onPageSizeChanged: PropTypes.func,
  pageSize: PropTypes.oneOf(Object.values(PaginationEnum).map((item) => item.key)),
  pageIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  isDynamicDate: PropTypes.bool,
};

TableComponent.displayName = 'TableComponent';

TableComponent.defaultProps = {
  // checkboxes related features
  isDynamicDate: false,
  dateFormat: GlobalDisplayDateTimeFormat,
  tableOptions: {
    pageSizeOptions: [10, 20, 25, 50, 100],
    tableSize: 'small',
    dateFormat: null,
    sortFrom: 1, // 1:front,2:do nothing only send that it change
  },
  parentTranslationPath: undefined,
  sharedTranslationPath: undefined,
  translationPath: '',
  sortColumnClicked: undefined,
  headerData: [],
  data: [],
  footerData: [],
  headerRowRef: 'headerRowRef',
  bodyRowRef: 'bodyRowRef',
  // pagination
  paginationIdRef: undefined,
  onPageIndexChanged: undefined,
  onPageSizeChanged: undefined,
  isLoading: false,
  isWithEmpty: false,
  defaultMessage: undefined,
  message: undefined,
  pageSize: 10,
};

export default memo(TableComponent);
