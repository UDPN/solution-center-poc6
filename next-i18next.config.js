/*
 * @Author: W·S
 * @Date: 2022-11-05 11:34:00
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-14 18:48:02
 * @Description: Description
 */
// used for SSR (getServerSideProps)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');
/** @type {import('next-i18next').UserConfig} */
const config = {
  // debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: process.env.NEXT_DEFALUT_LOCALE,
    locales: ['en-US', 'zh-CN'],
  },
  localePath: resolve('./public/locales'),
};
module.exports = config;
