/*
 * @Author: W·S
 * @Date: 2022-12-19 16:48:49
 * @LastEditors: W·S
 * @LastEditTime: 2022-12-29 21:58:11
 * @Description: Description
 */
/** @description:t('note_0003') */
export const setLS = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};
