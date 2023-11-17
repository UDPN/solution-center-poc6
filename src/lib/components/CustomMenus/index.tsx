import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Image } from 'antd';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MenuLeft } from './MenuLeft';
import { CustomMenuHeader } from './Header';
import { useHook } from 'libs/components';
export default function Example(props: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useHook(['login']);

  return (
    <div className="w-full h-full flex">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <div
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full cursor-pointer"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <div className="text-center mt-6 ml-6">
                    {/* <Image
                      src="/stablecoin/images/logo.svg"
                      alt=""
                      preview={false}
                      rootClassName="w-36 h-18"
                    ></Image> */}
                  </div>
                </div>
                <div className="mt-12 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 pb-4 px-4">
                    {/* 左侧导航栏 */}
                    <MenuLeft setSidebarOpen={setSidebarOpen}></MenuLeft>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="text-center mt-6 ml-6">
              {/* <Image
                src="/stablecoin/images/logo.svg"
                alt=""
                preview={false}
                rootClassName="w-36 h-18"
              ></Image> */}
              <div className="text-2xl font-semibold text-center">
                {t('Router_002_001')}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 pb-4 px-4">
              {/* //左侧导航栏 */}
              <MenuLeft />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:pl-80 bg-bgtheme">
        <div className="h-16 my-3 flex items-center bg-white shadow mx-4 rounded-lg">
          <div
            className="border-r border-gray-200 px-4 text-gray-500 lg:hidden cursor-pointer  "
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <CustomMenuHeader></CustomMenuHeader>
        </div>
        <main className="flex-1 px-4 overflow-y-auto">
          <div className="w-full rounded-lg">
            <div>{props.children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
