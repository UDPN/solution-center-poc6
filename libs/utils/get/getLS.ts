/*
 * @Author: W·S
 * @Date: 2022-12-19 16:48:49
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-24 19:30:07
 * @Description: Description
 */
/** @description */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getLS: <T = {}>(key: string) => T = (key: string) => {
  const Breadcrumbs = window.localStorage.getItem(key);
  return Breadcrumbs ? JSON.parse(Breadcrumbs) : null;
};
