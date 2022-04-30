import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  FilterOptionsState,
} from '@mui/base';
import { HTMLAttributes, JSXElementConstructor, ReactNode, SyntheticEvent } from 'react';

interface AutocompleteRenderOptionState {
  inputValue: string;
  selected: boolean;
}

type AutocompleteRenderGetTagProps = ({ index }: { index: number }) => {
  key: number;
  className: string;
  disabled: boolean;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: SyntheticEvent) => void;
};

export interface AutocompleteInterface {
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value?: string | object | (string | object)[] | null,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | object | (string | object)[]> | undefined
  ) => void;
  options: readonly (object | string)[];
  getOptionLabel: (option: object | string) => string;
  defaultValue?: object;
  labelClasses?: string;
  isLoading: boolean;
  value?: object | null;
  inputValue?: string;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  getOptionDisabled?: (option: string | object | (string | object)[]) => boolean;
  chipsLabel?: (option: object, index: number) => ReactNode | string;
  chipsDisabled?: (option: object, index: number) => boolean;
  translationPath?: string;
  parentTranslationPath?: string;
  labelValue?: string;
  inputPlaceholder?: string;
  idRef: string;
  wrapperClasses?: string;
  autocompleteClasses?: string;
  variant: 'outlined' | 'filled' | 'standard';
  multiple: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  inputClasses?: string;
  inputWrapperClasses?: string;
  helperText?: string;
  error: boolean;
  inputLabel?: string;
  renderOption?: (
    props: HTMLAttributes<HTMLLIElement>,
    option: string | object | (string | object)[],
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  withLoader: boolean;
  disableClearable: boolean;
  renderTags: (
    value: string | object | (string | object)[],
    getTagProps: AutocompleteRenderGetTagProps
  ) => ReactNode;
  isSubmitted: boolean;
  paddingReverse?: string | number;
  inputStartAdornment?: ReactNode;
  inputEndAdornment?: ReactNode;
  themeClass?: string;
  autocompleteThemeClass?: string;
  inputThemeClass?: string;
  popperClasses?: string;
  popperThemeClasses?: string;
  withBackdrop: boolean;
  dropdownIcon: string;
  dropdownClearIcon: string;
  isOptionEqualToValue: (
    option: string | object | (string | object)[],
    value: string | object | (string | object)[]
  ) => boolean;
  onInputKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  tagValues: object[];
  filterOptions: (options: (string | object)[], state: FilterOptionsState<object>) => object[];
  limitTags?: number;
  groupBy?: (option: string | object | (string | object)[]) => string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  noOptionsText: string | ReactNode;
  autoComplete?: string;
  tabIndex?: number;
  onScroll?: (event: SyntheticEvent<Element, Event>) => void;
  onScrollEnd?: VoidFunction;
  onOpen?: (event: SyntheticEvent<Element, Event>) => void;
  onClose?: (event: SyntheticEvent<Element, Event>) => void;
  paperComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
  autoHighlight?: boolean;
  isFreeSolo?: boolean;
  inlineLabel?: string;
  inlineLabelClasses?: string;
}
