import { ReactNode } from 'react';

export interface ButtonInterface {
  onClick?: VoidFunction;
  themeClass?: string;
  themeType?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  body?: ReactNode;
  title?: string | number;
  icon?: string;
  wrapperClasses?: string;
  parentTranslationPath?: string;
  translationPath?: string;
}
