/*
 * @Author: W·S
 * @Date: 2022-09-20 13:31:58
 * @LastEditors: W·S
 * @LastEditTime: 2022-12-31 17:24:23
 * @Description: Description
 */

import type { UrlObject } from 'node:url';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useHook = (_translation?: string[]) => {
  const translation = ['common', 'router', ...(_translation || [])];
  const { t } = useTranslation(translation);
  const router = useRouter();

  const routerBack = () => router.back();

  const routerPush = async (
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: {
      shallow?: boolean;
      locale?: string | false;
      scroll?: boolean;
      unstable_skipClientCache?: boolean;
    }
  ): Promise<boolean> => await router.push(url, as, options);

  const routerReplace = async (
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: {
      shallow?: boolean;
      locale?: string | false;
      scroll?: boolean;
      unstable_skipClientCache?: boolean;
    }
  ): Promise<boolean> => await router.replace(url, as, options);

  const query = router.query;

  return {
    t: (str: string) => t(str, { ns: translation }),
    routerPush,
    routerReplace,
    routerBack,
    query,
    router,
  };
};
