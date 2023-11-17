import { Menu, Transition } from '@headlessui/react';
import {
  ArrowDownCircleIcon,
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpCircleIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
  BackspaceIcon,
  Cog6ToothIcon,
  EyeIcon,
  LinkIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilSquareIcon,
  PlusIcon,
  PowerIcon,
  ShieldExclamationIcon,
  ViewfinderCircleIcon,
  RocketLaunchIcon,
  StopCircleIcon,
  NoSymbolIcon,
  PlayCircleIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';
import { Modal } from 'antd';
import type { MenuItemType } from 'antd/lib/menu/hooks/useItems';
import { showMessage } from 'libs/utils';
import { Fragment } from 'react';
import { useHook } from '../useHook';

const { confirm } = Modal;
export const getIcon = (key: string) => {
  const iconStyle = {
    'aria-hidden': true,
    className: 'mr-1 h-4 w-4 text-gray-400 group-hover:text-blue-400',
  };
  switch (key) {
    case 'New':
      return <PlusIcon {...iconStyle} />;
    case 'View':
      return <EyeIcon {...iconStyle} />;
    case 'Edit':
      return <PencilSquareIcon {...iconStyle} />;
    case 'Delete':
      return <BackspaceIcon {...iconStyle} />;
    case 'Enable':
    case 'UnFreeze':
    case 'UnFreeze1':
      return <LockOpenIcon {...iconStyle} />;
    case 'Deactivate':
      return <LockClosedIcon {...iconStyle} />;
    case 'Disable':
    case 'Freeze':
    case 'Freeze1':
      return <LockClosedIcon {...iconStyle} />;
    case 'Examine':
    case 'WalletFreezeExamine':
    case 'WalletUnfreezeExamine':
    case 'StablecoinFreezeExamine':
    case 'StablecoinUnfreezeExamine':
      return <ShieldExclamationIcon {...iconStyle} />;
    case 'ConfigurationUpgrade':
    case 'Upgrade':
      return <ArrowUpCircleIcon {...iconStyle} />;
    case 'Uninstall':
      return <PowerIcon {...iconStyle} />;
    case 'Download':
    case 'DownloadCertificate':
      return <ArrowDownCircleIcon {...iconStyle} />;
    case 'UpdateCertificate':
      return <ArrowPathIcon {...iconStyle} />;
    case 'AccessSetting':
      return <Cog6ToothIcon {...iconStyle} />;
    case 'AppUpgrade':
      return <ArrowUpOnSquareStackIcon {...iconStyle} />;
    case 'Publish':
      return <ArrowUpOnSquareIcon {...iconStyle} />;
    case 'UnPublish':
      return <ArrowDownOnSquareIcon {...iconStyle} />;
    case 'InviteParticipation':
      return <LinkIcon {...iconStyle} />;
    case 'Detail':
      return <ViewfinderCircleIcon {...iconStyle} />;
    case 'Redeploy':
    case 'Reset':
      return <ArrowPathRoundedSquareIcon {...iconStyle} />;
    case 'Deploy':
      return <RocketLaunchIcon {...iconStyle} />;
    case 'Init':
      return <StopCircleIcon {...iconStyle} />;
    case 'Deauthorize':
      return <NoSymbolIcon {...iconStyle} />;
    case 'ReAuthorize':
      return <PlayCircleIcon {...iconStyle} />;
    case 'History':
      return <ClockIcon {...iconStyle} />;
    default:
      return <></>;
  }
};
export function TailwindUIMenu({
  title,
  items,
  onClick,
  callback,
}: PropsWithChildren<{
  title: ReactNode;
  items: (MenuItemType & {
    confimDesc?: string;
    confimStr?: string;
    key: string;
  })[];
  onClick: (
    e: MenuItemType & { confimDesc?: string; confimStr?: string; key: string }
  ) => void | Promise<{
    [s: string]: unknown;
    data: {
      [s: string]: unknown;
      code?: string | number | undefined;
    };
  }>;
  callback: () => void;
}>) {
  const { t } = useHook();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border-[0px] bg-transparent border-[#1677ff] px-3 py-1 text-sm text-[#1677ff] hover:bg-gray-100 cursor-pointer">
          {title}
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-[#1677ff]"
            aria-hidden="true"
          /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item) => {
            return (
              <Menu.Item
                as="div"
                className="py-1 cursor-pointer"
                key={item.key}
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                {({ close }) => (
                  <div
                    onClick={() => {
                      if (!item.confimStr && !item?.confimDesc) {
                        onClick(item);
                      } else {
                        confirm({
                          className: '!w-2/3 !max-w-130',
                          title: item.label,
                          // icon: <ExclamationCircleFilled />,
                          content: (
                            <>
                              <p className="text-sm mt-4">
                                {item?.confimStr?.replaceAll(
                                  '****',
                                  item.label as string
                                )}
                              </p>
                              <p className="text-sm px-2 text-gray-400">
                                {item?.confimDesc?.replaceAll(
                                  '****',
                                  item.label as string
                                )}
                              </p>
                            </>
                          ),
                          onOk() {
                            return new Promise((resolve, reject) => {
                              const prom = onClick(item);
                              prom &&
                                prom.then((res) => {
                                  if (res.data.code === 0) {
                                    showMessage(
                                      t('PUB_Success').replace(
                                        '****',
                                        item.label as string
                                      ),
                                      '',
                                      'success'
                                    );
                                    callback();
                                  }
                                  resolve(res.data.code);
                                });
                            });
                          },
                          // onCancel() {},
                        });
                      }
                    }}
                    className="group flex items-center px-4 py-2 text-sm hover:text-blue-400 hover:bg-gray-100"
                  >
                    {getIcon(item.key)}
                    {item.label}
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
