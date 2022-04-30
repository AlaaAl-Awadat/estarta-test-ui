import React, { memo, useEffect, useState, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Input.Style.scss';
import i18next from 'i18next';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import { InputInterface } from '../../interfaces';

const InputComponent = ({
    value,
    isRequired,
    isDisabled,
    idRef,
    onInputChanged,
    fieldClasses,
    wrapperClasses,
    labelClasses,
    translationPath,
    parentTranslationPath,
    labelValue,
    error,
    helperText,
    withLoader,
    autoCompleteParams,
    datePickerParams,
    isLoading,
    variant,
    label,
    inputPlaceholder,
    rows,
    multiline,
    type,
    onInputBlur,
    onKeyUp,
    onKeyDown,
    max,
    maxLength,
    min,
    minLength,
    step,
    endAdornment,
    startAdornment,
    multiple,
    refs,
    inputRef,
    isSubmitted,
    paddingReverse,
    themeClass,
    defaultValue,
    onInputFocus,
    onInputClick,
    autoComplete,
    pattern,
    tabIndex,
    isReadOnly,
    InputLabelProps,
    inlineLabel,
    inlineLabelClasses,
  }:InputInterface): ReactElement => {
    const [isBlurOrChanged, setIsBlurOrChanged] = useState<boolean>(false);
    const { t } = useTranslation<string>(parentTranslationPath);

    useEffect(() => {
      setIsBlurOrChanged(false);
    }, [isSubmitted]);

    return (
      <FormControl
        className={`input-wrapper ${themeClass}${
          (wrapperClasses && ` ${wrapperClasses}`) || ''
        }`}
        ref={refs}
      >
        {(labelValue) && (
          <div className="labels-wrapper">
            {labelValue && (
              <label
                htmlFor={idRef}
                className={`label-wrapper${(labelClasses && ` ${labelClasses}`) || ''}${
                  isDisabled ? ' disabled' : ''
                }`}
              >
                {t(`${translationPath}${labelValue}`)}
              </label>
            )}
          </div>
        )}
        <div className="w-100 p-relative d-flex-center">
          <div className="text-field-wrapper">
            {inlineLabel && (
              <label
                htmlFor={idRef}
                className={`inline-label-wrapper${
                  (inlineLabelClasses && ` ${inlineLabelClasses}`) || ''
                }${isDisabled ? ' disabled' : ''}`}
              >
                {t(`${translationPath}${inlineLabel}`)}
              </label>
            )}
            <TextField
              {...autoCompleteParams}
              {...datePickerParams}
              autoComplete={autoComplete}
              required={isRequired}
              ref={inputRef}
              disabled={isDisabled}
              className={`input${(fieldClasses && ` ${fieldClasses}`) || ''}`}
              style={
                (i18next.dir() === 'rtl' && {
                  paddingRight: paddingReverse,
                }) || {
                  paddingLeft: paddingReverse,
                }
              }
              id={idRef}
              onFocus={onInputFocus}
              label={label && t(`${translationPath}${label}`)}
              placeholder={inputPlaceholder && t(`${translationPath}${inputPlaceholder}`)}
              variant={variant}
              helperText={
                (helperText && (isBlurOrChanged || isSubmitted) && error && helperText) || undefined
              }
              value={value}
              defaultValue={defaultValue}
              error={((isBlurOrChanged || isSubmitted) && error) || false}
              rows={rows}
              onClick={onInputClick}
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              type={type}
              multiline={multiline}
              onChange={
                ((onInputChanged || error) &&
                  ((event) => {
                    if (!isBlurOrChanged) setIsBlurOrChanged(true);
                    if (onInputChanged) {
                      const localValue = event.target.value;
                      if (pattern && localValue && !pattern.test(localValue)) return;
                      onInputChanged(event);
                    }
                  })) ||
                undefined
              }
              onBlur={(event) => {
                if (!isBlurOrChanged) setIsBlurOrChanged(true);
                if (onInputBlur) {
                  const localValue = event.target.value;
                  if (pattern && localValue && !pattern.test(localValue)) return;
                  onInputBlur(event);
                }
              }}
              inputProps={{
                max,
                maxLength,
                min,
                minLength,
                step,
                multiple,
                tabIndex,
                readOnly: isReadOnly,
                ...autoCompleteParams.inputProps,
                ...datePickerParams.inputProps,
              }}
              InputProps={{
                ...autoCompleteParams.InputProps,
                ...datePickerParams.InputProps,
                endAdornment:
                  (withLoader && isLoading && !endAdornment && (
                    <div className="input-loading-wrapper">
                      <CircularProgress color="inherit" size={20} />
                    </div>
                  )) ||
                  endAdornment ||
                  (autoCompleteParams.InputProps && autoCompleteParams.InputProps.endAdornment) ||
                  (datePickerParams.InputProps && datePickerParams.InputProps.endAdornment) ||
                  undefined,
                startAdornment:
                  startAdornment ||
                  (autoCompleteParams.InputProps && autoCompleteParams.InputProps.startAdornment) ||
                  (datePickerParams.InputProps && datePickerParams.InputProps.startAdornment) ||
                  undefined,
              }}
              InputLabelProps={InputLabelProps}
            />
          </div>
        </div>
      </FormControl>
    );
  };

export default memo(InputComponent);

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  defaultValue: PropTypes.oneOfType([PropTypes.any]),
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  onInputChanged: PropTypes.func,
  onInputBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  idRef: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  minLength: PropTypes.number,
  step: PropTypes.number,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
  withLoader: PropTypes.bool,
  multiline: PropTypes.bool,
  fieldClasses: PropTypes.string,
  autoCompleteParams: PropTypes.instanceOf(Object),
  datePickerParams: PropTypes.instanceOf(Object),
  wrapperClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  translationPath: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  labelValue: PropTypes.string,
  pattern: PropTypes.instanceOf(RegExp),
  helperText: PropTypes.string,
  variant: PropTypes.oneOf(['outlined','filled', 'standard']),
  label: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  type: PropTypes.string,
  rows: PropTypes.number,
  multiple: PropTypes.bool,
  refs: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isSubmitted: PropTypes.bool,
  paddingReverse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  themeClass: PropTypes.oneOf(['theme-solid']),
  autoComplete: PropTypes.string,
  onInputFocus: PropTypes.func,
  onInputClick: PropTypes.func,
  inlineLabel: PropTypes.string,
  inlineLabelClasses: PropTypes.string,
  tabIndex: PropTypes.number,
  isReadOnly: PropTypes.bool,
  InputLabelProps: PropTypes.shape({
    shrink: PropTypes.bool,
    required: PropTypes.bool,
  }),
};
InputComponent.defaultProps = {
  defaultValue: undefined,
  onInputChanged: undefined,
  onInputBlur: undefined,
  onKeyUp: undefined,
  onKeyDown: undefined,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  minLength: undefined,
  tabIndex: undefined,
  step: undefined,
  value: undefined,
  pattern: undefined,
  isSubmitted: false,
  paddingReverse: undefined,
  themeClass: 'theme-solid',
  multiple: false,
  refs: undefined,
  inputRef: undefined,
  isRequired: false,
  isDisabled: false,
  error: false,
  multiline: false,
  fieldClasses: undefined,
  labelClasses: undefined,
  wrapperClasses: undefined,
  translationPath: '',
  parentTranslationPath: undefined,
  variant: 'standard',
  labelValue: undefined,
  label: undefined,
  inputPlaceholder: undefined,
  helperText: undefined,
  withLoader: false,
  isLoading: false,
  type: 'text',
  rows: 4,
  autoComplete: undefined,
  startAdornment: undefined,
  endAdornment: undefined,
  onInputFocus: undefined,
  onInputClick: undefined,
  autoCompleteParams: {},
  datePickerParams: {},
  isReadOnly: undefined,
  InputLabelProps: undefined,
  inlineLabel: undefined,
  inlineLabelClasses: undefined,
};
