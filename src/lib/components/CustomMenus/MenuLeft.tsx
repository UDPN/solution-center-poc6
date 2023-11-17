/*
 * @Author: zhoudandan
 * @Date: 2023-03-07 14:14:56
 * @LastEditors: huangyuexia
 * @LastEditTime: 2023-07-06 17:41:50
 * @Description: Description
 */

import { ConfigProvider, Menu, MenuProps } from 'antd';
import { useHook } from 'libs/components';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMenuHook } from '@/lib/router/useMenuHook';
export const MenuLeft = ({
  setSidebarOpen,
}: {
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t, routerPush, router } = useHook();
  const { items } = useMenuHook();
  // const [userPermission, setUserPermission] = useState<Array<string>>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onClick: MenuProps['onClick'] = (e: { key: string }) => {
    if (e.key === '/home') {
      setOpenKeys([]);
    }
    routerPush(e.key);
    setSidebarOpen && setSidebarOpen(false);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    setSelectedKeys([router.pathname]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // items?.forEach((el: any) => {
    //   if (el.children) {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     el.children.map((item: any) => {
    //       if (router.pathname.indexOf(item.key) > -1) {
    //         console.log(item.key, ' el.children');
    //         setOpenKeys([el.key]);
    //         setSelectedKeys([item.key]);
    //       }
    //     });
    //   } else {
    //     const pathname = '/' + router.pathname.split('/')[1];
    //     console.log(pathname, 'pathname');
    //     setSelectedKeys([pathname]);
    //   }
    // });
  }, [router.pathname, items]);
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            // linear-gradient(90deg, #60A3CE -5.58%, #3C5686 108.84%)
            Menu: {
              // colorItemBgHover: '#f4f0ff',
              // colorGroupTitle: '#C9CFD7',
              // colorItemBg: 'white',
              // colorItemText: 'bg-theme',
              // fontSize: 14,
              // paddingXL: 52,
            },
          },
        }}
      >
        <Menu
          style={{
            // paddingLeft: '2rem',
            // paddingRight: '2rem',
            border: 0,
          }}
          mode="inline"
          openKeys={openKeys}
          items={items}
          onClick={onClick}
          selectedKeys={selectedKeys}
          onSelect={(e) => {
            setSelectedKeys(e.selectedKeys);
          }}
          onOpenChange={onOpenChange}
        ></Menu>
      </ConfigProvider>
    </div>
  );
};
