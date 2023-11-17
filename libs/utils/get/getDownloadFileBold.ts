/*
 * @Author: zhoudandan
 * @Date: 2023-03-09 15:02:38
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-24 19:29:04
 * @Description: Description
 */

import { AxiosResponse } from 'axios';
import { getDownLoadFile, showMessage } from '..';
import common from '../../../public/locales/zh-CN/api-msg.json';

/**
 * @description
 */
export const getDownLoadFileBold = (
  res: AxiosResponse<Blob>,
  contractFileName?: string
): void => {
  const bold = new Blob([res.data]);
  const filename =
    res.headers['content-disposition']?.split('filename=')[1] || '';
  const url = window.URL.createObjectURL(bold);
  if (res.data.type == 'application/json') {
    const reader = new FileReader();
    reader.readAsText(bold, 'utf-8');
    reader.onload = () => {
      const result = JSON.parse(reader.result + '');
      console.log(result);
      if (result.code && result.code != '0') {
        showMessage(
          'warning',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (common as any)[result.message],
          'warning'
        );
      } else {
        getDownLoadFile(url, contractFileName || filename, '');
      }
    };
  } else {
    getDownLoadFile(url, contractFileName || filename, '');
  }
};
