import React from 'react'

const DatePickerComponent = () => {
  return (
    <div>DatePickerComponent</div>
  )
}

export default DatePickerComponent
/** @note  I comment this beautiful date picker because v18 of react still not supported 😖 */
// import React, { memo, ReactElement } from 'react';
// import PropTypes from 'prop-types';
// import DatePicker from '@mui/lab/DatePicker';
// import ar from 'moment/locale/ar';
// import AdapterMoment from '@mui/lab/AdapterMoment';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import InputComponent from '../input/Input.Component';
// import { DatePickerInterface, TextFieldProps } from '../../interfaces';
// import moment from 'moment';
// import './DatePicker.Style.scss';
// import i18next from 'i18next';

// const DatePickerComponent = ({
//   label,
//   labelValue,
//   inputPlaceholder,
//   maxDate,
//   minDate,
//   parentTranslationPath,
//   value,
//   onChange,
//   idRef,
// }: DatePickerInterface): ReactElement => {
//   const localeMap = {
//     ar: ar,
//   };
//   return (
//     <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment} locale={localeMap[i18next.language as keyof typeof localeMap] || undefined}>
//       <DatePicker
//         label={label}
//         value={value}
//         onChange={onChange}
//         className="date-picker-component-wrapper"
//         maxDate={maxDate}
//         minDate={minDate}
//         renderInput={(params) => (
//           <InputComponent
//             idRef={idRef}
//             inputPlaceholder={inputPlaceholder}
//             labelValue={labelValue}
//             wrapperClasses="date-picker-input-wrapper"
//             parentTranslationPath={parentTranslationPath}
//             datePickerParams={params as TextFieldProps}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };

// DatePickerComponent.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string,
//   idRef: PropTypes.string,
//   labelValue: PropTypes.string,
//   maxDate: PropTypes.string,
//   minDate: PropTypes.string,
//   parentTranslationPath: PropTypes.string,
//   inputPlaceholder: PropTypes.string,
//   onChange: PropTypes.func,
// };
// DatePickerComponent.defaultProps = {
//   label: undefined,
//   labelValue: undefined,
//   parentTranslationPath: undefined,
//   inputPlaceholder: undefined,
//   maxDate: undefined,
//   minDate: undefined,
//   value: undefined,
//   onChange: undefined,
//   idRef: 'DatePickerComponentRef',
// };

// export default memo(DatePickerComponent);
