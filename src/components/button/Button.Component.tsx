import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonInterface } from '../../interfaces';
import './Button.Style.scss';

const ButtonComponent = ({
  onClick,
  themeClass,
  themeType,
  type,
  isDisabled,
  body,
  title,
  icon,
  wrapperClasses,
  parentTranslationPath,
  translationPath,
}: ButtonInterface): ReactElement => {
  const { t } = useTranslation<string>(parentTranslationPath);
  return (
    <ButtonBase
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`btn-wrapper ${themeType} ${themeClass}${
        (wrapperClasses && ` ${wrapperClasses}`) || ''
      }`}
    >
      {body || (
        <>
          {icon && <span className={icon} />}
          {title && (
            <span className={(icon && ' px-2') || ''}>
              {(parentTranslationPath && t(`${translationPath}${title}`)) || title}
            </span>
          )}
        </>
      )}
    </ButtonBase>
  );
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  themeClass: PropTypes.oneOf(['theme-solid', 'theme-transparent']),
  themeType: PropTypes.oneOf(['btn-width', 'btn-icon', 'btn']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  body: PropTypes.element,
  wrapperClasses: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
};
ButtonComponent.defaultProps = {
  onClick: undefined,
  title: undefined,
  icon: undefined,
  themeClass: 'theme-solid',
  themeType: 'btn',
  type: undefined,
  body: undefined,
  isDisabled: undefined,
  wrapperClasses: undefined,
  parentTranslationPath: undefined,
  translationPath: '',
};

export default ButtonComponent;
