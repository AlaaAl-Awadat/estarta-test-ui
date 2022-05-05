import React, { FormEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import AutocompleteComponent from '../../components/autocomplete/Autocomplete.Component';
import ButtonComponent from '../../components/button/Button.Component';
// import DatePickerComponent from '../../components/date-picker/DatePicker.Component';
import InputComponent from '../../components/input/Input.Component';
import TableComponent from '../../components/tables/Table.Component';
import {
  AdminDataAuditLogInterface,
  AdminDataInterface,
  AdminFilterInterface,
} from '../../interfaces';
import { GetAllAdminDataService } from '../../services';
import moment from 'moment';
import './Administration.Style.scss';
import i18next, { t } from 'i18next';
import { languageChange } from '../../helpers';

const parentTranslationPath = 'AdministrationPage';

const AdministrationPage = (): ReactElement => {
  const [data, setData] = useState<AdminDataInterface | null>(null);
  const [filteredData, setFilteredData] = useState<AdminDataAuditLogInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localLanguage, setLocalLanguage] = useState<string>(i18next.language);
  const [filters, setFilters] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [state, setState] = useState<AdminFilterInterface>({
    userAgent: '',
    applicationId: '',
    fromDate: null,
    toDate: null,
    actionType: null,
    applicationType: null,
  });

  /**
   * @author Aladdin Al-Awadat (alaamohammadyou@gmail.com)
   * @description this method is to get the administration data on init load
   */
  const getAllAdminData = useCallback(async () => {
    setIsLoading(true);
    const response = await GetAllAdminDataService();
    setIsLoading(false);
    if (response && response.status === 200) {
      setData(response.data);
      setFilteredData(response.data.result.auditLog);
    } else {
      setData(null);
      setFilteredData([]);
    }
  }, []);

  const onPageIndexChanged = (pageIndex: number) => {
    setFilters((items) => ({ ...items, pageIndex }));
  };
  const onPageSizeChanged = (pageSize: number) => {
    setFilters((items) => ({ ...items, pageIndex: 0, pageSize }));
  };

  const filterHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFilteredData(
      data?.result.auditLog.filter((item) => {
        const filledItems = Object.entries(state).filter((element) => element[1]);
        return (
          !filledItems.length ||
          filledItems.every(
            (element) =>
              ((element[0] === 'fromDate' || element[0] === 'toDate') &&
                item['creationTimestamp' as keyof typeof item] &&
                ((element[0] === 'fromDate' &&
                  moment(
                    `${item['creationTimestamp' as keyof typeof item] as string}`
                  ).isSameOrAfter(element[1], 'D')) ||
                  (element[0] === 'toDate' &&
                    moment(
                      `${item['creationTimestamp' as keyof typeof item] as string}`
                    ).isSameOrBefore(element[1], 'D')))) ||
              (item[element[0] as keyof typeof item] &&
                `${item[element[0] as keyof typeof item] as string}`
                  .toLowerCase()
                  .includes(
                    (typeof element[1] === 'object' &&
                      element[1] !== null &&
                      element[1][element[0]].toLowerCase()) ||
                      element[1].toLowerCase()
                  ))
          )
        );
      }) || []
    );
  };

  useEffect(() => {
    getAllAdminData();
  }, [getAllAdminData]);

  return (
    <div className="administration-page-wrapper pages-wrapper">
      <div className="d-flex-h-end mb-3">
        <div className="d-inline-flex px-2">
          <AutocompleteComponent
            options={i18next.languages}
            getOptionLabel={(option) => t(`Shared:${option as string}`) || 'N/A'}
            isOptionEqualToValue={(option, value) => (option as string) === (value as string)}
            idRef="languageRef"
            value={localLanguage}
            labelValue="language"
            inputPlaceholder="select-language"
            disableClearable
            parentTranslationPath="Shared"
            onChange={(event, newValue) => {
              setLocalLanguage(newValue as string);
              languageChange(newValue as string);
            }}
          />
        </div>
      </div>
      <form noValidate onSubmit={filterHandler} className="filters-wrapper">
        <div className="filter-section">
          <div className="filter-item">
            <InputComponent
              idRef="employeeNameRef"
              value={state.userAgent}
              labelValue="employee-name"
              inputPlaceholder="employee-name-description"
              parentTranslationPath={parentTranslationPath}
              onInputChanged={({ target: { value } }) => {
                setState((items) => ({ ...items, userAgent: value }));
              }}
            />
          </div>
          <div className="filter-item">
            <AutocompleteComponent
              options={
                data?.result.auditLog.filter(
                  (item, index, items) =>
                    item.actionType &&
                    items.findIndex((element) => element.actionType === item.actionType) === index
                ) || []
              }
              getOptionLabel={(option) =>
                (option as AdminDataAuditLogInterface).actionType || 'N/A'
              }
              isOptionEqualToValue={(option, value) =>
                (option as AdminDataAuditLogInterface).actionType ===
                (value as AdminDataAuditLogInterface).actionType
              }
              idRef="actionTypeRef"
              value={state.actionType}
              labelValue="action-type"
              inputPlaceholder="select-action-type"
              parentTranslationPath={parentTranslationPath}
              onChange={(event, newValue) => {
                setState((items) => ({
                  ...items,
                  actionType: newValue as AdminDataAuditLogInterface,
                }));
              }}
            />
          </div>
          <div className="filter-item">
            <AutocompleteComponent
              options={
                data?.result.auditLog.filter(
                  (item, index, items) =>
                    item.applicationType &&
                    items.findIndex(
                      (element) => element.applicationType === item.applicationType
                    ) === index
                ) || []
              }
              getOptionLabel={(option) =>
                (option as AdminDataAuditLogInterface).applicationType || 'N/A'
              }
              isOptionEqualToValue={(option, value) =>
                (option as AdminDataAuditLogInterface).applicationType ===
                (value as AdminDataAuditLogInterface).applicationType
              }
              idRef="applicationTypeRef"
              value={state.applicationType}
              labelValue="application-type"
              inputPlaceholder="select-application-type"
              parentTranslationPath={parentTranslationPath}
              onChange={(event, newValue) => {
                setState((items) => ({
                  ...items,
                  applicationType: newValue as AdminDataAuditLogInterface,
                }));
              }}
            />
          </div>
          <div className="filter-item">
            <InputComponent
              idRef="fromDateRef"
              value={(state.fromDate && moment(state.fromDate).format('YYYY-MM-DD')) || ''}
              max={(state.toDate && moment(state.toDate).format('YYYY-MM-DD')) || undefined}
              type="date"
              labelValue="from-date"
              inputPlaceholder="select-date"
              parentTranslationPath={parentTranslationPath}
              onInputChanged={({ target: { value } }) => {
                setState((items) => ({
                  ...items,
                  fromDate: (value && moment(value, 'YYYY-MM-DD').format()) || null,
                }));
              }}
            />
          </div>
          <div className="filter-item">
            <InputComponent
              idRef="toDateRef"
              value={(state.toDate && moment(state.toDate).format('YYYY-MM-DD')) || ''}
              min={(state.fromDate && moment(state.fromDate).format('YYYY-MM-DD')) || undefined}
              type="date"
              labelValue="to-date"
              inputPlaceholder="select-date"
              parentTranslationPath={parentTranslationPath}
              onInputChanged={({ target: { value } }) => {
                setState((items) => ({
                  ...items,
                  toDate: (value && moment(value, 'YYYY-MM-DD').format()) || null,
                }));
              }}
            />
          </div>
          <div className="filter-item">
            <InputComponent
              idRef="applicationIdRef"
              value={state.applicationId}
              labelValue="application-id"
              inputPlaceholder="application-id-description"
              parentTranslationPath={parentTranslationPath}
              onInputChanged={({ target: { value } }) => {
                setState((items) => ({ ...items, applicationId: value }));
              }}
            />
          </div>
        </div>
        <div className="filter-section">
          <ButtonComponent
            title="search-logger"
            type="submit"
            themeType="btn-width"
            themeClass="theme-solid"
            parentTranslationPath={parentTranslationPath}
          />
        </div>
      </form>
      <TableComponent
        headerData={[
          {
            id: 1,
            input: 'logId',
            label: 'log-id',
            isSortable: true,
          },
          {
            id: 2,
            input: 'applicationType',
            label: 'application-type',
            isSortable: true,
          },
          {
            id: 3,
            input: 'applicationId',
            label: 'application-id',
            isSortable: true,
          },

          {
            id: 4,
            input: 'actionType',
            label: 'action',
            isSortable: true,
          },
          {
            id: 5,
            input: 'details',
            label: 'details',
            isSortable: true,
          },
          {
            id: 6,
            input: 'creationTimestamp',
            label: 'date-time',
            isSortable: true,
            isDate: true,
          },
        ]}
        onPageIndexChanged={onPageIndexChanged}
        onPageSizeChanged={onPageSizeChanged}
        isWithEmpty
        isLoading={isLoading}
        data={filteredData}
        parentTranslationPath={parentTranslationPath}
        pageIndex={filters.pageIndex}
        pageSize={filters.pageSize}
        totalItems={filteredData.length || 0}
      />
    </div>
  );
};

export default AdministrationPage;
