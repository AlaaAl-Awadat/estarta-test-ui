import React, { memo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import NoData from '../../assets/images/shared/empty-1.png';
import { useTranslation } from 'react-i18next';
import { EmptyInterface } from '../../interfaces';

const EmptyComponent = ({
  message,
  defaultMessage,
  parentTranslationPath,
  translationPath,
}: EmptyInterface): ReactElement => {
  const { t } = useTranslation<string>(parentTranslationPath);
  return (
    <div className="empty-component-wrapper">
      <img
        className="empty-image"
        src={NoData}
        alt={message || t(`${translationPath}${defaultMessage}`)}
      />
      <div className="empty-text">{message || t(`${translationPath}${defaultMessage}`)}</div>
    </div>
  );
};

EmptyComponent.propTypes = {
  message: PropTypes.string,
  defaultMessage: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
};
EmptyComponent.defaultProps = {
  message: undefined,
  defaultMessage: 'no-data-found',
  parentTranslationPath: 'Shared',
  translationPath: '',
};
EmptyComponent.displayName = 'EmptyComponent';
export default memo(EmptyComponent);
