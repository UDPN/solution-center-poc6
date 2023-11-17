/*
 * @Author: W·S
 * @Date: 2022-06-07 16:11:32
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-27 15:56:40
 * @Description: Description
 */

import { getLS, showMessage } from 'libs/utils';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import router from 'next/router';
import common from '../../public/locales/en-US/api-msg.json';

let reqNum = 0;
const CancelToken = axios.CancelToken;
const pending: Map<string, () => void> = new Map();

const delPending = (config: AxiosRequestConfig<unknown>) => {
  const configUrl =
    config.url + (config.data ? JSON.stringify(config.data) : '');
  pending.delete(configUrl);
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AGENT_ID,
  timeout: 60000,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'x-frame-options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    token: '',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (reqNum == 0) console.log('第一个请求');

    const configUrl =
      config.url + (config.data ? JSON.stringify(config.data) : '');

    if (pending.has(configUrl)) {
      reqNum--;
      pending.get(configUrl)?.();
    }

    config.cancelToken = new CancelToken((c) => {
      pending.set(configUrl, c);
    });
    const token = getLS<{ token: string }>('userInfo');
    if (config.headers) {
      config.headers['token'] = token ? token?.token : '';
      config.headers['language'] = 'zh-CN';
    }
    reqNum++;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    delPending(response.config);
    reqNum--;
    if (reqNum == 0) console.log('最后一个回调');
    if (process.env.NEXT_MOCK === 'true') response.data.code = 0;
    if (response.data.code !== 0 && response.data.code !== '0')
      switch (response.data.code) {
        case 1:
        case '1':
          showMessage(
            'warning',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (common as any)[response.data.message],
            'warning'
          );
          break;
        case 2:
        case '2':
          showMessage(
            'warning',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (common as any)[response.data.message],
            'warning'
          );
          break;
        case 3:
        case '3':
          showMessage(
            'warning',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (common as any)[response.data.message],
            'warning'
          );
          router.push('/');
          break;
        case '4':
          showMessage(
            'warning',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (common as any)[response.data.message],
            'warning'
          );
          router.push('/');
          break;
        default:
          break;
      }

    return response;
  },
  (error) => {
    if (error.message === 'canceled')
      return {
        data: {
          code: '1',
          data: undefined,
          message: 'canceled',
        },
      };
    if (error.response) {
      delPending(error.response.config);
    }
    reqNum--;
    if (reqNum == 0) console.log('最后一个回调 Error');
    if (error.response.request.status == '401') {
      showMessage(
        'warning',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (common as any)['MSG_0004'],
        'warning'
      );
      router.push('/');
    }
    return {
      data: {
        code: '-1',
        data: undefined,
        error,
      },
    };
  }
);

export const request = (url: string, option: AxiosRequestConfig) => {
  return instance(url, { ...option });
};

export const fetcher = (args: [url: string, param?: BCMP.Objects]) =>
  new Promise((resolve) => {
    request(args[0], {
      method: args.length > 1 ? 'POST' : 'GET',
      data: args.length > 1 && args[1],
    }).then((res) => {
      resolve(res.data.code == 0 ? res.data.data : undefined);
    });
  });
