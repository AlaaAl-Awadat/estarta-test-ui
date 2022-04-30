import React from 'react';
export const GlobalDisplayDateTimeFormat = 'YYYY-MM-DD / HH:mm:ss';

export const getDataFromObject = (
  dataItem: object,
  key: string | undefined,
  isReturnAsIs = false
): string | number | (string | number)[] | boolean | Date | undefined | null => {
  if (!key)
    return (typeof dataItem !== 'object' && (isReturnAsIs ? dataItem : `${dataItem}`)) || '';
  if (typeof dataItem !== 'object' || Array.isArray(dataItem))
    return dataItem as string | number | (string | number)[];
  if (!(key as string).includes('.'))
    return (
      (dataItem[key as keyof typeof dataItem] !== null &&
        (isReturnAsIs
          ? dataItem[key as keyof typeof dataItem]
          : (dataItem[key as keyof typeof dataItem] &&
              `${dataItem[key as keyof typeof dataItem]}`) || <span className="c-gray-light">-/-</span>)) ||
      ''
    );
  let a = dataItem;
  (key as string).split('.').map((item: string) => {
    const k = item as keyof typeof a;
    if (a) a = a[k];
    return item;
  });
  return a as string | number | (string | number)[] | null | undefined;
};
