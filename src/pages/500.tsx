/*
 * @Author: W·S
 * @Date: 2022-09-15 23:11:58
 * @LastEditors: W·S
 * @LastEditTime: 2022-12-31 13:52:40
 * @Description: Description
 */

import Link from 'next/link';
import { useHook } from 'libs/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/* This example requires Tailwind CSS v2.0+ */
const Example500 = () => {
  const { t, query } = useHook(['api-msg']);
  try {
    return (
      <>
        <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-center"></div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-9xl font-semibold text-indigo-600">500</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {t(query.m + '')}
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <Link href="/">
                    <span className="text-2xl font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Go back home
                      <span aria-hidden="true"> &rarr;</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  } catch (error) {
    console.log('error', error);
  }
};
export default Example500;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'router',
        'api-msg',
      ])),
    },
  };
};
