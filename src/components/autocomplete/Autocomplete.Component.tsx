/* eslint-disable */
import React, { memo, ReactElement, SyntheticEvent, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.Style.scss';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Chip } from '@mui/material';
import InputComponent from '../input/Input.Component';
import { AutocompleteInterface } from '../../interfaces';

const AutocompleteComponent = ({
  onChange,
  options,
  getOptionLabel,
  defaultValue,
  labelClasses,
  isLoading,
  value,
  inputValue,
  onInputChange,
  getOptionDisabled,
  chipsLabel,
  chipsDisabled,
  translationPath,
  parentTranslationPath,
  labelValue,
  inputPlaceholder,
  idRef,
  wrapperClasses,
  autocompleteClasses,
  variant,
  multiple,
  isDisabled,
  isRequired,
  inputClasses,
  inputWrapperClasses,
  helperText,
  error,
  inputLabel,
  renderOption,
  withLoader,
  disableClearable,
  renderTags,
  isSubmitted,
  paddingReverse,
  inputStartAdornment,
  themeClass,
  autocompleteThemeClass,
  inputThemeClass,
  popperClasses,
  popperThemeClasses,
  withBackdrop,
  dropdownIcon,
  dropdownClearIcon,
  isOptionEqualToValue,
  onInputKeyUp,
  tagValues,
  filterOptions,
  limitTags,
  groupBy,
  inputEndAdornment,
  startAdornment,
  endAdornment,
  noOptionsText,
  autoComplete,
  tabIndex,
  onScroll,
  onScrollEnd,
  onOpen,
  onClose,
  paperComponent,
  autoHighlight,
  isFreeSolo,
  inlineLabel,
  inlineLabelClasses,
}: AutocompleteInterface): ReactElement => {
  const { t } = useTranslation<string>(parentTranslationPath);
  const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false);

  const onScrollEndHandler = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      const targetEvent = event.currentTarget as HTMLDivElement;
      if (
        onScrollEnd &&
        targetEvent &&
        targetEvent.scrollTop + targetEvent.clientHeight >= targetEvent.scrollHeight - 1
      )
        onScrollEnd();
    },
    [onScrollEnd]
  );

  return (
    <div
      className={`autocomplete-wrapper${(wrapperClasses && ` ${wrapperClasses}`) || ''}${
        themeClass || autocompleteThemeClass || ''
      }${(multiple && ' is-multiple') || ''}${(startAdornment && ' with-start-adornment') || ''}${
        (endAdornment && ' with-end-adornment') || ''
      }${(isDisabled && ' is-disabled') || ''}${(isFocusedInput && ' is-focused-input') || ''}`}
    >
      <div className="autocomplete-contents-wrapper">
        {(startAdornment && (
          <div className="start-adornment-wrapper">
            {(typeof startAdornment === 'string' && t(`${translationPath}${startAdornment}`)) ||
              startAdornment}
          </div>
        )) ||
          undefined}
        <Autocomplete
          autoHighlight={autoHighlight}
          multiple={multiple}
          disableClearable={disableClearable}
          id={idRef}
          onOpen={onOpen}
          onClose={onClose}
          limitTags={limitTags}
          className={`autocomplete${(autocompleteClasses && ` ${autocompleteClasses}`) || ''}`}
          options={options}
          freeSolo={isFreeSolo}
          classes={{
            popper: `autocomplete-popper-wrapper${(popperClasses && ` ${popperClasses}`) || ''}${
              ((themeClass || popperThemeClasses) && ` ${themeClass || popperThemeClasses}`) || ''
            }${(withBackdrop && ' with-backdrop') || ''}${(isFreeSolo && ' is-free-solo') || ''}`,
          }}
          PaperComponent={paperComponent}
          groupBy={groupBy}
          onKeyUp={onInputKeyUp}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          defaultValue={defaultValue}
          isOptionEqualToValue={isOptionEqualToValue}
          loading={isLoading}
          value={value}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onChange={onChange}
          getOptionDisabled={getOptionDisabled}
          disabled={isDisabled}
          filterOptions={filterOptions}
          noOptionsText={noOptionsText && t(`Shared:${noOptionsText}`)}
          clearIcon={<span className={`${dropdownClearIcon} dropdown-close-icon-wrapper`} />}
          popupIcon={<span className={`${dropdownIcon} dropdown-icon-wrapper`} />}
          ListboxProps={{
            onScroll: onScroll || (onScrollEnd && onScrollEndHandler),
          }}
          renderTags={
            renderTags ||
            ((tagValue, getTagProps) => (
              <div className="internal-chips-wrapper">
                {(tagValues || tagValue).map((option: any, index: number) => (
                  <Chip
                    {...getTagProps({ index })}
                    className="autocomplete-chip"
                    label={chipsLabel && chipsLabel(option, index)}
                    disabled={(chipsDisabled && chipsDisabled(option, index)) || undefined}
                    key={`autocompleteChipRef${index + 1}`}
                  />
                ))}
              </div>
            )) ||
            undefined
          }
          renderInput={(params) => (
            <InputComponent
              idRef={idRef}
              label={inputLabel}
              labelValue={labelValue}
              labelClasses={labelClasses}
              autoCompleteParams={params}
              inputPlaceholder={inputPlaceholder}
              variant={variant}
              isSubmitted={isSubmitted}
              paddingReverse={paddingReverse}
              isRequired={isRequired}
              tabIndex={tabIndex}
              wrapperClasses={inputWrapperClasses}
              fieldClasses={inputClasses}
              startAdornment={inputStartAdornment}
              endAdornment={inputEndAdornment}
              translationPath={translationPath}
              parentTranslationPath={parentTranslationPath}
              themeClass={themeClass || inputThemeClass}
              isLoading={isLoading}
              withLoader={withLoader}
              error={error}
              helperText={helperText}
              autoComplete={autoComplete}
              inlineLabel={inlineLabel}
              inlineLabelClasses={inlineLabelClasses}
              onInputFocus={() => setIsFocusedInput(true)}
              onInputBlur={() => setIsFocusedInput(false)}
            />
          )}
        />
        {(endAdornment && (
          <div className="end-adornment-wrapper">
            {(typeof endAdornment === 'string' && t(`${translationPath}${endAdornment}`)) ||
              endAdornment}
          </div>
        )) ||
          undefined}
      </div>
    </div>
  );
};

export default memo(AutocompleteComponent);


AutocompleteComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  tagValues: PropTypes.instanceOf(Array),
  disableClearable: PropTypes.bool,
  chipsLabel: PropTypes.func,
  renderTags: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  groupBy: PropTypes.func,
  renderOption: PropTypes.func,
  onInputKeyUp: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.instanceOf(Array),
  isLoading: PropTypes.bool,
  multiple: PropTypes.bool,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollEnd: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.func,
  getOptionDisabled: PropTypes.func,
  chipsDisabled: PropTypes.func,
  parentTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
  labelValue: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  idRef: PropTypes.string,
  wrapperClasses: PropTypes.string,
  autocompleteClasses: PropTypes.string,
  variant: PropTypes.string,
  inputWrapperClasses: PropTypes.string,
  noOptionsText: PropTypes.string,
  inputClasses: PropTypes.string,
  helperText: PropTypes.string,
  inputLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  error: PropTypes.bool,
  withLoader: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  limitTags: PropTypes.number,
  paddingReverse: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputStartAdornment: PropTypes.node,
  inputEndAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  startAdornment: PropTypes.node,
  paperComponent: PropTypes.node,
  themeClass: PropTypes.oneOf([
    'theme-primary',
    'theme-default',
    'theme-solid',
    'theme-solid-v2',
    'theme-solid-v3',
    'theme-dark',
    'theme-underline',
    'theme-outline',
    'theme-underline-light',
    'theme-default-dark',
    'theme-transparent',
  ]),
  autocompleteThemeClass: PropTypes.string,
  inputThemeClass: PropTypes.string,
  popperClasses: PropTypes.string,
  popperThemeClasses: PropTypes.string,
  dropdownIcon: PropTypes.string,
  dropdownClearIcon: PropTypes.string,
  withBackdrop: PropTypes.bool,
  labelClasses: PropTypes.string,
  inlineLabel: PropTypes.string,
  inlineLabelClasses: PropTypes.string,
  autoHighlight: PropTypes.bool,
  isFreeSolo: PropTypes.bool,
};

AutocompleteComponent.defaultProps = {
  defaultValue: undefined,
  value: undefined,
  tagValues: undefined,
  isLoading: false,
  inputValue: undefined,
  isOptionEqualToValue: undefined,
  labelClasses: undefined,
  onInputChange: undefined,
  onScroll: undefined,
  onScrollEnd: undefined,
  onOpen: undefined,
  onClose: undefined,
  paperComponent: undefined,
  groupBy: undefined,
  limitTags: undefined,
  renderOption: undefined,
  renderTags: undefined,
  getOptionDisabled: undefined,
  tabIndex: undefined,
  noOptionsText: 'no-options',
  chipsDisabled: undefined,
  parentTranslationPath: undefined,
  translationPath: undefined,
  labelValue: undefined,
  inputPlaceholder: undefined,
  idRef: 'autocompleteRef',
  wrapperClasses: undefined,
  autocompleteClasses: undefined,
  variant: 'standard',
  inputWrapperClasses: undefined,
  dropdownIcon: 'mdi mdi-chevron-down',
  dropdownClearIcon: 'mdi mdi-close',
  inputClasses: undefined,
  popperClasses: undefined,
  popperThemeClasses: undefined,
  onInputKeyUp: undefined,
  withBackdrop: false,
  chipsLabel: undefined,
  helperText: undefined,
  inputLabel: undefined,
  multiple: false,
  isDisabled: false,
  isRequired: false,
  error: false,
  withLoader: true,
  disableClearable: false,
  isSubmitted: false,
  paddingReverse: undefined,
  inputStartAdornment: undefined,
  inputEndAdornment: undefined,
  startAdornment: undefined,
  endAdornment: undefined,
  themeClass: undefined,
  autocompleteThemeClass: undefined,
  autoComplete: 'new-password',
  inputThemeClass: undefined,
  filterOptions: undefined,
  autoHighlight: undefined,
  isFreeSolo: undefined,
  inlineLabel: undefined,
  inlineLabelClasses: undefined,
};
