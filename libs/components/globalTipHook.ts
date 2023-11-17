import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { request } from 'src/lib/axios';
import { useEffect } from 'react';
import { activeGlobalTipQueen } from 'libs/utils/get/globalTipKeyQueenLs';
interface CustomEvent extends Event {
  key?: string;
  newValue?: string;
  oldValue?: string | null;
}

export const useGlobalTip = (url?: string) => {
  async function updateUser(url: string, { arg }: BCMP.Objects) {
    return request(url, {
      method: 'POST',
      data: arg,
    });
  }
  let timer: NodeJS.Timer | null = null;
  const { trigger, data } = useSWRMutation(url, updateUser);
  useEffect(() => {
    const setItemEvent: CustomEvent = new Event('setItemEvent');
    const orignalSetItem = localStorage.setItem;
    window.localStorage.setItem = function (key: string, newValue: string) {
      setItemEvent.key = key;
      setItemEvent.newValue = newValue;
      setItemEvent.oldValue = localStorage.getItem(key);
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this, [key, newValue]);
    };
    activeGlobalTipQueen();
    window.addEventListener('setItemEvent', (e: CustomEvent) => {
      if (
        e.key === 'globalTipKeyQueen' &&
        window.localStorage.getItem('userInfo')
      ) {
        console.log(e);
        const obj = e.newValue && JSON.parse(e.newValue);
        if (obj && obj.length > 0 && timer === null) {
          // console.log(timer, 'timer');
          timer = setInterval(async () => {
            if (localStorage.getItem('userInfo')) {
              await trigger(
                JSON.parse(localStorage.getItem('globalTipKeyQueen') as string)
              );
            } else {
              window.clearInterval(timer as unknown as number);
              timer = null;
            }

            //   console.log(data?.data?.data);
          }, 3000);
        } else if (obj && obj.length === 0 && timer !== null) {
          window.clearInterval(timer);
          timer = null;
        }
      }
    });
  }, []);

  return { data: data?.data?.data };
};
