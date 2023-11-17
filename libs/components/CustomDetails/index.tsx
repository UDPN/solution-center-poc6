import { classNames } from 'libs/utils';
import { Fragment } from 'react';
import { CustomTitle } from '../CustomTitle';
import { useHook } from '../useHook';
import { Button } from 'antd';

export interface detailInfoItem_type {
  hide?: boolean;
  title?: ReactNode;
  actions?: ReactNode;
  labelWidth?: string;
  col?: number;
  hideBack?: boolean;
  prepend?: () => ReactNode;
  append?: () => ReactNode;
  list?: Array<{
    label: string;
    value: ReactNode;
    hide?: () => boolean;
    itemCol?: number;
  }>;
  render?: () => ReactNode;
}

export const CustomDetails = (
  props: PropsWithChildren<{
    detailsInfo: Array<detailInfoItem_type>;
    hideBack?: boolean;
  }>
) => {
  const { t, routerBack } = useHook();
  return (
    <div>
      {props.detailsInfo?.map((detailInfoItem, detailInfoIndex) => {
        return (
          <div key={'Card' + detailInfoIndex} className="mb-4">
            {detailInfoItem.hide ? null : (
              <div className="pb-4 md:pb-8 shadow rounded-lg bg-white">
                {detailInfoItem.title || detailInfoItem.actions ? (
                  <CustomTitle
                    title={detailInfoItem.title || undefined}
                    extra={detailInfoItem.actions || undefined}
                  />
                ) : null}
                <div className="">
                  {detailInfoItem.render && detailInfoItem.render() ? (
                    detailInfoItem.render && detailInfoItem.render()
                  ) : (
                    <Fragment>
                      <div>
                        {detailInfoItem.prepend && detailInfoItem.prepend()}
                      </div>
                      <div
                        className={classNames(
                          'grid gap-4 grid-cols-1 pt-16 pb-10 px-24',
                          detailInfoItem.col === 1 ? 'md:grid-cols-1' : '',
                          detailInfoItem.col === 2 ? 'md:grid-cols-2' : '',
                          detailInfoItem.col === 3 ? 'md:grid-cols-3' : '',
                          detailInfoItem.col ? '' : 'md:grid-cols-2'
                        )}
                      >
                        {detailInfoItem.list?.map((listItem, listIndex) => {
                          return (
                            <Fragment key={'detailInfoItem' + listIndex}>
                              {listItem.hide && listItem.hide() ? null : (
                                <div
                                  className={classNames(
                                    'xl:flex text-sm  text-fontTheme2 col-span-1',
                                    listItem.itemCol === 2
                                      ? 'md:col-span-2'
                                      : 'md:col-span-1',
                                    listItem.label ? 'px-4 xl:px-0' : ''
                                  )}
                                >
                                  {listItem.label ? (
                                    <div
                                      style={{
                                        width:
                                          detailInfoItem.labelWidth ||
                                          '12.5rem',
                                      }}
                                      className="inline-flex xl:justify-end items-start  leading-10 pr-4 font-bold"
                                    >
                                      {listItem.label}
                                    </div>
                                  ) : null}
                                  <div className="flex-1 block leading-10 break-all">
                                    {listItem.value}
                                  </div>
                                </div>
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                      <div>
                        {detailInfoItem.append && detailInfoItem.append()}
                      </div>
                    </Fragment>
                  )}
                </div>
                {detailInfoItem.hideBack ||
                detailInfoIndex !== props.detailsInfo.length - 1 ? null : (
                  <div className="mt-5">
                    <Button
                      key={'index'}
                      type="primary"
                      onClick={routerBack}
                      className={'!h-auto !px-8 !py-2 text-base ml-[60%]'}
                    >
                      {t('PUB_GoBack')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
