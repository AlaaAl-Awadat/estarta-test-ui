import useAutocomplete from '@mui/material/useAutocomplete';
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode, Ref, RefObject } from 'react';

interface AutocompleteRenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth: boolean;
  size: 'small' | undefined;
  InputLabelProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputLabelProps']>;
  InputProps: {
    ref: Ref<object>;
    className: string;
    startAdornment: ReactNode;
    endAdornment: ReactNode;
  };
  inputProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']>;
}

export type TextFieldProps = {
  InputProps: {
    ref: Ref<object>;
    className: string;
    startAdornment: ReactNode;
    endAdornment: ReactNode;
  };
  inputProps: object;
};

export interface InputInterface {
  value?: number | string;
  isRequired?: boolean;
  isDisabled?: boolean;
  idRef: string;
  onInputChanged?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldClasses: string;
  wrapperClasses: string;
  labelClasses: string;
  translationPath?: string;
  parentTranslationPath?: string;
  labelValue: string;
  error?: boolean;
  helperText?: string;
  withLoader?: boolean;
  autoCompleteParams: AutocompleteRenderInputParams;
  datePickerParams: TextFieldProps,
  isLoading?: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  label?: string;
  inputPlaceholder: string;
  rows: number;
  multiline: boolean;
  type?: HTMLInputTypeAttribute;
  onInputBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyUp?: VoidFunction;
  onKeyDown?: VoidFunction;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  step: number;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  multiple: boolean;
  refs?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
  inputRef?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
  isSubmitted: boolean;
  paddingReverse?: string | number;
  themeClass?: string;
  defaultValue?: string | number;
  onInputFocus?: VoidFunction;
  onInputClick?: VoidFunction;
  autoComplete?: string;
  pattern?: RegExp;
  tabIndex?: number;
  isReadOnly?: boolean;
  InputLabelProps?: object;
  inlineLabel?: string;
  inlineLabelClasses?: string;
}
