import React, { memo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import NoData from '../../assets/images/shared/empty-1.png';
import { EmptyInterface } from '../../interfaces';
import './Empty.Style.scss';
import { useTranslation } from 'react-i18next';

const EmptyComponent = ({
  message,
  defaultMessage,
  parentTranslationPath,
  sharedTranslationPath,
  translationPath,
}: EmptyInterface): ReactElement => {
  const { t } = useTranslation<string>(parentTranslationPath);
  console.log('t', t);
  return (
    <div className="empty-component-wrapper">
      <img
        className="empty-image"
        src={NoData}
        alt={
          (message && t(`${translationPath}${message}`)) || t(`${sharedTranslationPath}:${translationPath}${defaultMessage}`)
        }
      />
      <div className="empty-text">
        {(message && t(`${translationPath}${message}`)) || t(`${sharedTranslationPath}:${translationPath}${defaultMessage}`)}
      </div>
    </div>
  );
};

EmptyComponent.propTypes = {
  message: PropTypes.string,
  defaultMessage: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  sharedTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
};
EmptyComponent.defaultProps = {
  message: undefined,
  defaultMessage: 'no-data-found',
  parentTranslationPath: undefined,
  sharedTranslationPath: 'Shared',
  translationPath: '',
};
EmptyComponent.displayName = 'EmptyComponent';
export default memo(EmptyComponent);
