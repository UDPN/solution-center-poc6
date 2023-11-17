/*
 * @Author: W·S
 * @Date: 2022-12-28 14:08:40
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-24 19:30:22
 * @Description: Description
 */
/**
 *
 * @returns
 * @param type
 * @ Empty
 * @ Email : **@*.*
 * @ Phone :
 * @ Account :
 */
export const getPattern = (type: 'Empty' | 'Email' | 'Phone' | 'Account') => {
  switch (type) {
    case 'Empty':
      return /\S/;
    case 'Email':
      return /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
    case 'Phone':
      return /^(1[0-9]{10})$/;
    case 'Account':
      return /^[a-zA-Z][a-zA-Z0-9_]{5,24}$/;
  }
};
