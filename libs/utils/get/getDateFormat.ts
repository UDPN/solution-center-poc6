/*
 * @Author: Feix
 * @Date: 2022-11-18 14:00:52
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-24 19:28:00
 * @Description:
 */

import { isNotEmpty } from '../is/isNotEmpty';

/**
 * @description
 * @type {Function}
 * @param date
 * @param type
 * @returns
 */
export const getDateFormat = (date: string, type = 0): string => {
  let format = '';
  switch (type) {
    case 0:
      format = 'YYYY-MM-DD';
      break;
    case 1:
      format = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 2:
      format = 'YYYY/MM/DD';
      break;
    case 3:
      format = 'YYYY/MM/DD HH:mm:ss';
      break;
    case 4:
      format = 'HH:mm:ss';
      break;
    case 5:
      format = 'HH:mm';
      break;
  }
  const days = new Date(date);
  const year = days.getUTCFullYear();
  const month = days.getUTCMonth() + 1;
  const day = days.getDate();
  const hours = days.getHours();
  const minutes = days.getMinutes();
  const seconds = days.getSeconds();
  if (isNotEmpty(date)) {
    const datef = format
      .replace('YYYY', year + '')
      .replace('MM', month > 9 ? month + '' : '0' + month)
      .replace('DD', day > 9 ? day + '' : '0' + day)
      .replace('HH', hours > 9 ? hours + '' : '0' + hours)
      .replace('mm', minutes > 9 ? minutes + '' : '0' + minutes)
      .replace('ss', seconds > 9 ? seconds + '' : '0' + seconds);
    return datef.indexOf('NaN') >= 0 ? '--' : datef;
  }
  return '--';
};
