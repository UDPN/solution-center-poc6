/*
 * @Author: W·S
 * @Date: 2022-11-05 11:34:00
 * @LastEditors: huangyuexia
 * @LastEditTime: 2023-05-23 13:06:40
 * @Description: Description
 */
const colors = {
    bgtheme: '#F7F9FE',
    theme: '#60A3CE',
    fontTheme: '#183B56',
    fontTheme2: '#466278',
    fontTheme3: '#53FF02',
    fontTheme4: '#0B8808',
    bgtheme1: '#214B7D',
    bgtheme2: '#E6EDF5',
    stateColor0: '#F69741',
    stateBg0: '#FDE3CC',
    stateColor1: '#F69741',
    stateBg1: '#D0FCEE',
    stateColor2: '#D54E4E',
    stateBg2: '#FDD4D2',
    stateColor3: '#D54E4E',
    stateBg3: '#FDD4D2',
    'theme-100': '',
    'theme-200': '',
    'theme-300': '',
    'theme-400': '',
    'theme-500': '',
    'theme-600': '',
    'theme-700': '',
    'theme-800': '',
    'theme-900': '',
    hoverTheme: '',
  },
  spacing = {};

for (let index = 4; index <= 1920; index += 2)
  spacing[index] = index / 4 + 'rem';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      mxl: '1366px',
      xl: '1440px',
      '2xl': '1536px',
      maxmd: { max: '767px' },
    },
    extend: {
      spacing,
      minWidth: spacing,
      maxWidth: spacing,
      minHeight: spacing,
      maxHeight: spacing,
      colors,
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
