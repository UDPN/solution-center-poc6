/*
 * @Author: W·S
 * @Date: 2022-12-09 16:14:21
 * @LastEditors: huangyuexia
 * @LastEditTime: 2023-06-02 15:36:41
 * @Description: Description
 */

/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config({ path: './.env' });
require('dotenv').config({ path: './.env.development' });
/**
 * @type {(phase: string, config: any) => import('next').NextConfig}
 */
const normalizeConfig = (phase, defaultConfig) => {
  global.NEXT_SERVICE_SERVER_URL = process.env.NEXT_SERVICE_SERVER_URL;
  return {
    output: 'standalone',
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
      localeDetection: false,
      locales: ['en-US', 'zh-CN'],
      defaultLocale: process.env.NEXT_DEFALUT_LOCALE,
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['tailwindui.com', 'images.unsplash.com'],
    },
    env: {
      pocType: process.env.NODE_TYPE ? process.env.NODE_TYPE : 'development',
    },
    async rewrites() {
      return [
        {
          source: process.env.NEXT_PUBLIC_AGENT_ID + '/:path*',
          destination: process.env.NEXT_SERVICE_SERVER_URL + '/:path*',
        },
        ...getREWRITES(),
      ];
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'X-Frame-Options',
              value: 'ALLOWALL',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // {
            //   key: "Content-Security-Policy",
            //   value:
            //     "img-src * data:; default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'",
            // },
          ],
        },
      ];
    },
  };
};

module.exports = normalizeConfig;

function getREWRITES() {
  return [];
}
