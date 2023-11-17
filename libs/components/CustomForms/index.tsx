/*
 * @Author: W·S
 * @Date: 2022-12-16 12:53:39
 * @LastEditors: nanxiaodi 13934779844@qq.com
 * @LastEditTime: 2023-06-04 15:48:33
 * @Description: Description
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosPromise } from 'axios';
import { showMessage } from 'libs/utils';
import { Button, Form, Spin } from 'antd';
import { Fragment, PropsWithChildren, useState } from 'react';
import { useHook } from '../useHook';
import { CustomForm } from './CustomForm';
import { CustomTitle } from '../CustomTitle';

interface CustomCardProps {
  header?: {
    title?: ReactNode;
    actions?: ReactNode;
  };
}

export type OnFinishType = (
  values: any
) =>
  | AxiosPromise<BCMP.ANY & { code?: string }>
  | Promise<BCMP.ANY & { code?: string }>;
type ButtonsProps = Array<
  {
    label: string;
    tip?: string;
    promiseFun?: () => AxiosPromise<BCMP.Objects & { code?: string }>;
  } & ButtonProps
>;

export interface CustomFormsProps {
  type?: string;
  cards: Array<
    CustomCardProps & {
      key: string;
      notShadow?: boolean;
      formItems: PropsWithChildren<FormItemProps & { hide?: () => boolean }>[];
    }
  >;
  form: {
    onFinish: undefined | OnFinishType;
    FinshCallback?: (res: BCMP.Objects) => void;
  } & FormProps;
  hideBack?: boolean;
  isBack?: boolean;
  buttons?: ButtonsProps;
}

export const CustomForms = (props: CustomFormsProps) => {
  const { t, routerBack } = useHook();
  const [isLoading, setIsLoading] = useState(false);
  const [tip, setTip] = useState(t('PUB_Saveing'));
  const [label, setLabel] = useState('');
  const onFinish = async (values: BCMP.Objects) => {
    props.form.onFinish !== undefined &&
      loadingFun(
        () => (props.form.onFinish as OnFinishType)(values),
        props.isBack ?? true
      );
  };
  const loadingFun = async (
    fun: () => AxiosPromise<BCMP.Objects & { code?: string | number }>,
    isBack = false
  ) => {
    setIsLoading(true);
    const res = await fun();
    props.form?.FinshCallback && props.form?.FinshCallback(res);
    setIsLoading(false);
    setTip(t('PUB_Saveing'));
    if (res.data.code === 0) {
      showMessage(t('PUB_Success').replace('****', label), '', 'success');
      if (isBack) routerBack();
    }
  };
  return (
    <Spin tip={tip} size="large" spinning={isLoading}>
      <CustomForm
        {...props.form}
        form={props.form?.form}
        onFinish={onFinish}
        colon={false}
      >
        {props.cards.map((cards, index) => {
          const { formItems, ...card } = cards;
          return (
            <div
              key={card.key}
              className={
                'mb-4 bg-white ' + (card.notShadow ? '' : 'shadow rounded-lg')
              }
            >
              {card.header?.title || card.header?.actions ? (
                <CustomTitle
                  title={card.header?.title}
                  extra={card.header?.actions}
                />
              ) : null}
              <div
                className={
                  props.type == 'modal'
                    ? 'pt-8 pb-10 px-10 '
                    : props.type == 'examine'
                    ? 'pt-8 pb-10 px-0'
                    : 'pt-16 pb-10 px-24'
                }
              >
                {formItems.map((items) => {
                  const { children, hide, ...item } = items;
                  return (
                    <Fragment key={item.name + ''}>
                      {hide && hide() ? null : (
                        <Form.Item {...item} validateFirst={true}>
                          {children}
                        </Form.Item>
                      )}
                    </Fragment>
                  );
                })}
                {index + 1 === props.cards.length ? (
                  <Form.Item label=" " colon={false} className="my-10">
                    {props.hideBack ? null : (
                      <Button
                        key={'index'}
                        onClick={routerBack}
                        className={'h-auto px-6 py-2 text-base mx-2 '}
                      >
                        {t('PUB_GoBack')}
                      </Button>
                    )}
                    {([...(props?.buttons || [])] as ButtonsProps).map(
                      (button, index) => {
                        return (
                          <Button
                            key={index}
                            {...button}
                            onClick={(e: any) => {
                              button?.tip && setTip(button?.tip);
                              setLabel(button.label);
                              button?.onClick && button?.onClick(e);
                              if (button.promiseFun) {
                                loadingFun(button.promiseFun);
                              }
                            }}
                            className={
                              'h-auto px-6 py-2 text-base mx-2 ' +
                              button.className
                            }
                          >
                            {button.label}
                          </Button>
                        );
                      }
                    )}
                  </Form.Item>
                ) : null}
              </div>
            </div>
          );
        })}
      </CustomForm>
    </Spin>
  );
};
