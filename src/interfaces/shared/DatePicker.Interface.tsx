import { ReactNode } from 'react';

export interface DatePickerInterface {
  label?: ReactNode | string;
  value?: string | null;
  labelValue?: string;
  inputPlaceholder?: string;
  parentTranslationPath?: string;
  maxDate?: string;
  minDate?: string;
  onChange: (date: string | null, keyboardInputValue?: string | undefined) => void;
  idRef: string;
}
