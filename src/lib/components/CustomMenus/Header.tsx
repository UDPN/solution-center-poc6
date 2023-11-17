/*
 * @Author: W·S
 * @Date: 2022-12-26 15:51:33
 * @LastEditors: songyinan songyinan@reddatetech.com
 * @LastEditTime: 2023-07-26 11:01:54
 * @Description: Description
 */
import { UserOutlined } from '@ant-design/icons';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { BellIcon } from '@heroicons/react/24/outline';
import { Avatar, Badge, Dropdown } from 'antd';
import { useHook } from 'libs/components/useHook';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { getLS } from 'libs/utils';
// let timer: NodeJS.Timer | null = null;
export const CustomMenuHeader = () => {
  const { t, routerReplace, router, routerPush } = useHook();
  const [userInfo, setUserInfo] = useState<BCMP.Objects>({});
  const [todoCount, setTodoCount] = useState('0');
  useEffect(() => {
    setUserInfo(getLS<Array<string>>('userInfo'));
    // if (!process.env.isPoc4) {
    //   getTodoCountApi();
    // }
  }, [router]);
  useEffect(() => {
    // timer = setInterval(async () => {
    //   if (getLS<Array<string>>('userInfo')) {
    //     if (!process.env.isPoc4) {
    //       getTodoCountApi();
    //     }
    //   } else {
    //     window.clearInterval(timer as unknown as number);
    //     timer = null;
    //   }
    // }, 5000);
  }, []);

  // const getTodoCountApi = async () => {
  //   const res = await getTodoCount();
  //   if (res.data.code !== 0) return;
  //   if (res?.data?.data !== null) {
  //     window.localStorage.setItem('todoCount', String(res.data.data));
  //     setTodoCount(String(res.data.data));
  //   }
  // };

  const dropdownMenu = {
    onClick: (info) => {
      switch (info.key) {
        case 'ChangePass':
          break;
        case 'SystemSetting':
          break;
        case 'ConfigUration':
          break;
        case 'LogOut':
          window.localStorage.removeItem('Token');
          routerReplace('/');
          break;
      }
    },
    items: [
      {
        label: <span className="text-gray-500">{t('PUB_Out')}</span>,
        key: 'LogOut',
        icon: <ArrowLeftOnRectangleIcon className="w-4 h-4" />,
      },
    ],
  } as MenuProps;
  const jumpPath = () => {
    routerPush({
      pathname: '/home',
    });
  };
  return (
    <div className="flex justify-between items-center px-4 w-full">
      <div className="md:pl-2">
        <Breadcrumbs></Breadcrumbs>
      </div>
      <div className="flex flex-1 justify-end px-4">
        <div className="ml-4 flex items-center lg:ml-6">
          {!process.env.isPoc4 ? (
            <Badge count={todoCount}>
              <BellIcon
                className="w-7 h-7 text-theme cursor-pointer"
                onClick={jumpPath}
              />
            </Badge>
          ) : null}

          <Dropdown menu={dropdownMenu} trigger={['click']}>
            <span className="cursor-pointer ml-5">
              <Avatar className="ml-3 my-7" icon={<UserOutlined />} />
              <span className="text-base ml-3">{userInfo.userName}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
