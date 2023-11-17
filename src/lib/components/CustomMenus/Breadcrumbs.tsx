/*
 * @Author: W·S
 * @Date: 2023-01-10 17:05:05
 * @LastEditors: huangyuexia
 * @LastEditTime: 2023-07-06 10:51:50
 * @Description: Description
 */

import { useHook } from 'libs/components';
import { Breadcrumb } from 'antd';
import { BreadcrumbItemType, ItemType } from 'antd/lib/breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import { useMenuHook } from '@/lib/router/useMenuHook';
import { SubMenuType } from 'antd/lib/menu/hooks/useItems';

export const Breadcrumbs = () => {
  const { t, router } = useHook(['router']);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);
  const path = router.asPath.split('?')[0];
  const { items } = useMenuHook();
  /** method **/
  const findBreadcrumbs = (
    data: SubMenuType[],
    targetKey: string,
    result: ItemType[],
    parentData?: ItemType[]
  ) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const { key, label, children } = data[i];
        // 如果是相同的key,则放入结果中去,并且如果有回调传下来的父级数据,一块合并到结果中
        if (key == targetKey) {
          if (parentData && key.split('/').length > 2) {
            result.push(...parentData, { title: label, href: key });
          } else {
            result.push({
              title: key === '/pledge' ? t('Router_063_1') : label,
              href: key,
            });
          }
          break;
        }
        // 如果有子数据,则记录当前数据,传入子数据中
        if (children) {
          parentData = [{ title: label }];
          findBreadcrumbs(
            children as unknown as SubMenuType[],
            targetKey,
            result,
            parentData
          );
        }
      }
    }
    return result;
  };
  /** effect **/
  useEffect(() => {
    const res = findBreadcrumbs(items as unknown as SubMenuType[], path, []);
    setBreadcrumbs(res as unknown as BreadcrumbItemType[]);
  }, [router, items]);

  return (
    <div className="px-8">
      <Breadcrumb separator=">" items={breadcrumbs}>
        {/* {breadcrumbs.map((breadcrumb, key) => {
          return (
            <Breadcrumb.Item key={key} className="text-sm text-black">
              <span className="text-theme">{breadcrumb!.title}</span>
            </Breadcrumb.Item>
          );
        })} */}
      </Breadcrumb>
    </div>
  );
};
