/*
 * @Author: W·S
 * @Date: 2022-09-15 14:40:16
 * @LastEditors: W·S
 * @LastEditTime: 2023-02-13 23:40:49
 * @Description: Description
 */

const t = (str: string) => str;
export const awaitMs = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

export const NavigationConfig = {
  '/': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/home': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/cloud-resource/resou-pool': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/cloud-resource/resou-pool/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/cloud-resource/resou-pool/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/cloud-resource/vd-center': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/cloud-resource/vd-center/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/cloud-resource/vd-center/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/pki/root-cert': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/pki/root-cert/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/pki/root-cert/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/pki/ca': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/pki/ca/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/pki/secret-key': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/pki/secret-key/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/pki/secret-key/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/config': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/config/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/config/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/sconfig': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/sconfig/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/sconfig/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/billing': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/billing/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/billing/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/system-authoritys': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/system-authoritys/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/system-authoritys/contract': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/chain': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/chain/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/chain/views': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/chain/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/chain/z': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/chain/z/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/chain/z/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/app': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/app/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/app/run-info': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/app/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/shared/bill': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/shared/bill/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/config': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/config/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/config/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/billing': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/billing/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/billing/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/chain': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/chain/examine': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/chain/view2': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/chain/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/alliance-chain/proprietary/bill': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/alliance-chain/proprietary/bill/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/config': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/config/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/config/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/sconfig': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/sconfig/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/sconfig/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/node': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/node/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/node/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/node/upgrade': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/n/node': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/n/node/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/n/node/upgrade': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/project': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/project/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/billing': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/billing/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/billing/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/shared/bill': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/shared/bill/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/config': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/proprietary/config/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/config/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/project': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/proprietary/project/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/billing': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/proprietary/billing/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/billing/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/public-chain/proprietary/bill': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/public-chain/proprietary/bill/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/sys/role': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/sys/role/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/sys/role/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/sys/user': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/sys/user/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/sys/user/view': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
  '/portal-users': [
    {
      label: t(''),
      zIndex: 0,
    },
  ],
  '/portal-users/edit': [
    {
      label: t(''),
      zIndex: 1,
    },
  ],
};
