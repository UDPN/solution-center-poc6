import {
  HomeModernIcon,
  SquaresPlusIcon,
  CurrencyYenIcon,
  PresentationChartLineIcon,
  BuildingLibraryIcon,
  TicketIcon,
} from '@heroicons/react/20/solid';
import { getLS } from 'libs/utils';
import { useEffect, useMemo, useState } from 'react';
import { useHook } from 'libs/components';

export const useMenuHook = () => {
  const { t, routerPush, router } = useHook();
  const [userPermission, setUserPermission] = useState<Array<string>>([]);
  const getItems = (
    key: string,
    label: string,
    limit: string,
    icon?: ReactNode,
    children?: MenuProps['items']
  ) => {
    return userPermission.indexOf(limit) >= 0
      ? [{ key, label, children, icon }]
      : [];
  };

  const iconClass = 'w-5 h-5';
  const items: MenuProps['items'] = useMemo(() => {
    return [];
  }, [userPermission]);

  useEffect(() => {
    const _userPermission = getLS<Array<string>>('userPermission');
    setUserPermission(_userPermission);
  }, []);

  return {
    items,
  };
};
