/*
 * @Author: W·S
 * @Date: 2022-12-19 16:48:49
 * @LastEditors: nanxiaodi 13934779844@qq.com
 * @LastEditTime: 2023-06-07 14:32:58
 * @Description: Description
 */
/** @description: from localStorage set data */
interface globalTipQueenItem {
  busId: number;
  type: number;
}
export const setGlobalTipQueenLS = (value: globalTipQueenItem) => {
  const globalTipKeyQueen = localStorage.getItem('globalTipKeyQueen');
  if (globalTipKeyQueen) {
    const arr = JSON.parse(globalTipKeyQueen);
    arr.push(value);
    window.localStorage.setItem('globalTipKeyQueen', JSON.stringify(arr));
  } else {
    const arr = [value];
    window.localStorage.setItem('globalTipKeyQueen', JSON.stringify(arr));
  }
};

export const delGlobalTipQueen = (busId: number) => {
  const globalTipKeyQueen = localStorage.getItem('globalTipKeyQueen');
  if (globalTipKeyQueen) {
    const arr = JSON.parse(globalTipKeyQueen);
    const index = arr.findIndex((item: globalTipQueenItem) => {
      return item.busId === busId;
    });
    console.log(arr, index, busId, 'arr');
    if (index > -1) {
      arr.splice(index, 1);
      window.localStorage.setItem('globalTipKeyQueen', JSON.stringify(arr));
    }
  }
};

export const activeGlobalTipQueen = () => {
  if (window.localStorage.getItem('globalTipKeyQueen')) {
    setTimeout(() => {
      window.localStorage.setItem(
        'globalTipKeyQueen',
        window.localStorage.getItem('globalTipKeyQueen') as string
      );
    }, 0);
  }
};
