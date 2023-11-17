/*
 * @Author: W·S
 * @Date: 2022-12-29 19:23:00
 * @LastEditors: W·S
 * @LastEditTime: 2023-01-10 10:12:38
 * @Description: Description
 */

import type { SSRConfig } from 'next-i18next';
import type { GetServerSidePropsResult } from 'next';

/**
 * t('note_0007') {props}
 * @param results t('note_0008')
 * @param props
 * @returns
 */
export function getServerSidePropsResult(
  results: BCMP.Objects[] | null,
  props: SSRConfig & BCMP.Objects
): GetServerSidePropsResult<BCMP.Objects> {
  if (results === null)
    return {
      props: props,
    };

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.code !== '0')
      return {
        redirect: {
          statusCode: 302,
          destination:
            result.code === '2' || result.code === '4'
              ? '/?m=' + result.message
              : '/500?m=' + result.message,
        },
      };
  }

  return {
    props: props,
  };
}
