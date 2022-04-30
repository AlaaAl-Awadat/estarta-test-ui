import React, { memo, ReactElement, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PaginationEnum } from '../../enums';
import './Pagination.Style.scss';
import ButtonComponent from '../button/Button.Component';
import AutocompleteComponent from '../autocomplete/Autocomplete.Component';
import { KeyValueInterface, PaginationInterface } from '../../interfaces';

const PaginationComponent = ({
  pageIndex,
  totalCount,
  pageSize,
  onPageIndexChanged,
  onPageSizeChanged,
  isRemoveTexts,
  isReversedSections,
  idRef,
  parentTranslationPath,
  translationPath,
  perPageText,
  pagesText,
  ofText,
  numberOfItemsBefore,
  numberOfItemsAfter,
}: PaginationInterface): ReactElement => {
  const { t } = useTranslation<string>(parentTranslationPath);
  const [pageNumber, setPageNumber] = useState<number>(pageIndex + 1);

  const totalNumberOfPages = useMemo(
    (): (() => number) => (): number => Math.ceil(totalCount / pageSize),
    [pageSize, totalCount]
  );
  const conditionBeforeAndAfter = useMemo(
    (): ((index: number) => boolean) =>
      (index: number): boolean =>
        index >=
          pageIndex -
            (numberOfItemsBefore -
              (pageIndex + numberOfItemsAfter >= totalNumberOfPages()
                ? totalNumberOfPages() - 1 - pageIndex - numberOfItemsAfter
                : 0)) &&
        index <=
          pageIndex +
            numberOfItemsAfter +
            (pageIndex < numberOfItemsBefore ? numberOfItemsBefore - pageIndex : 0),
    [numberOfItemsAfter, numberOfItemsBefore, pageIndex, totalNumberOfPages]
  );

  const pageChangeHandler =
    (keyValue: 'leftLast' | 'left' | 'right' | 'rightLast'): VoidFunction =>
    (): void => {
      let value = pageIndex;
      if (keyValue === 'leftLast') value = 0;
      else if (keyValue === 'left') value -= 1;
      else if (keyValue === 'right') value += 1;
      else if (keyValue === 'rightLast') value = totalNumberOfPages() - 1;
      setPageNumber(value + 1);
      if (onPageIndexChanged && value !== pageIndex) onPageIndexChanged(value);
    };
  const onPageNumberChange = useMemo(
    () =>
      (newValue: number): void => {
        let localValue = newValue;
        if (+localValue * pageSize >= totalCount) localValue = totalNumberOfPages();
        setPageNumber(+localValue);
        if (Number.isNaN(+localValue) || +localValue < 1) return;
        if (onPageIndexChanged && localValue !== pageIndex + 1) onPageIndexChanged(+localValue - 1);
      },
    [onPageIndexChanged, pageIndex, pageSize, totalCount, totalNumberOfPages]
  );

  const onPageSizeChangedHandler = (
    event: SyntheticEvent<Element, Event>,
    newValue?: string | object | (string | object)[] | null
  ): void => {
    if (onPageSizeChanged) onPageSizeChanged(+(newValue as KeyValueInterface).value);
  };

  const getActivePaginationEnum = (): KeyValueInterface | undefined =>
    Object.values(PaginationEnum).find((item) => item.key === pageSize);

  useEffect(() => {
    setPageNumber(pageIndex + 1);
  }, [pageIndex]);

  return (
    <div
      className={`pagination-component-wrapper${
        (isReversedSections && ' is-reversed-section') || ''
      }`}
    >
      <div className="pagination-section">
        {!isRemoveTexts && (
          <span className="fz-14px fw-medium pages-text">
            {t(`${translationPath}${pagesText}`)}:
          </span>
        )}
        {pageIndex > 1 && (
          <ButtonComponent
            themeType="btn"
            themeClass="theme-transparent"
            wrapperClasses="mb-1 mx-1"
            onClick={pageChangeHandler('leftLast')}
            icon="mdi mdi-chevron-double-left"
          />
        )}
        {pageIndex > 0 && (
          <ButtonComponent
            themeType="btn"
            themeClass="theme-transparent"
            wrapperClasses="mb-1 mx-1"
            onClick={pageChangeHandler('left')}
            icon="mdi mdi-chevron-left"
          />
        )}
        {Array.from(
          {
            length: totalNumberOfPages(),
          },
          (data, index) =>
            conditionBeforeAndAfter(index) && (
              <ButtonComponent
                themeType="btn"
                key={`paginationButtonsKey${idRef}${index + 1}`}
                themeClass="theme-transparent"
                wrapperClasses={`mb-1 mx-1${(pageNumber === index + 1 && ' active') || ''}`}
                onClick={() => onPageNumberChange(index + 1)}
                title={index + 1}
              />
            )
        )}
        {pageNumber * pageSize < totalCount && (
          <ButtonComponent
            themeType="btn"
            themeClass="theme-transparent"
            wrapperClasses="mb-1 mx-1"
            onClick={pageChangeHandler('right')}
            icon="mdi mdi-chevron-right"
          />
        )}
        {pageNumber * pageSize < totalCount && totalNumberOfPages() > 2 && (
          <ButtonComponent
            themeType="btn"
            themeClass="theme-transparent"
            wrapperClasses="mb-1 mx-1"
            onClick={pageChangeHandler('rightLast')}
            icon="mdi mdi-chevron-double-right"
          />
        )}
      </div>
      <div className="pagination-section">
        {!isRemoveTexts && (
          <span className="fz-14px fw-medium per-page-text">
            {t(`${translationPath}${perPageText}`)}
          </span>
        )}
        {onPageSizeChanged && (
          <AutocompleteComponent
            idRef={`${idRef}select`}
            options={Object.values(PaginationEnum)}
            value={getActivePaginationEnum()}
            onChange={onPageSizeChangedHandler}
            getOptionLabel={(option) => (option as KeyValueInterface).value + '' || ''}
            disableClearable
            isOptionEqualToValue={(option, value) => (option as KeyValueInterface).key === (value as KeyValueInterface).key}
            //   translationPath={translationPath}
            //   translationPathForData={translationPath}
          />
        )}
        <span className="details-wrapper">
          <span className="px-1">
            {pageSize * pageIndex + 1 >= totalCount ? totalCount : pageSize * pageIndex + 1}
          </span>
          <span className="mdi mdi-minus" />
          <span className="px-1">
            {pageSize * pageNumber >= totalCount ? totalCount : pageSize * pageNumber}
          </span>
          <span>{t(`${translationPath}${ofText}`)}</span>
          <span className="px-1">{totalCount}</span>
        </span>
      </div>
    </div>
  );
};

export default memo(PaginationComponent);

PaginationComponent.displayName = 'PaginationComponent';

PaginationComponent.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageIndexChanged: PropTypes.func.isRequired,
  onPageSizeChanged: PropTypes.func,
  pageSize: PropTypes.oneOf(Object.values(PaginationEnum).map((item) => item.key)),
  idRef: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
  perPageText: PropTypes.string,
  ofText: PropTypes.string,
  pagesText: PropTypes.string,
  isReversedSections: PropTypes.bool,
  isRemoveTexts: PropTypes.bool,
  numberOfItemsBefore: PropTypes.number,
  numberOfItemsAfter: PropTypes.number,
};
PaginationComponent.defaultProps = {
  idRef: 'paginationRef',
  parentTranslationPath: 'Shared',
  translationPath: 'pagination.',
  perPageText: 'item-per-page',
  pageSize: PaginationEnum[10].key,
  ofText: 'of',
  pagesText: 'pages',
  isReversedSections: false,
  isRemoveTexts: false,
  onPageSizeChanged: undefined,
  numberOfItemsBefore: 3,
  numberOfItemsAfter: 3,
};
