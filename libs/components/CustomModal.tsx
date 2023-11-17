/*
 * @Author: huangyuexia
 * @Date: 2023-04-18 13:38:51
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-18 20:33:45
 * @Description: Description
 */
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import { XMarkIcon } from '@heroicons/react/20/solid';
export type CustomModalProps = {
  subTitle?: string;
};

export const CustomModal = (
  props: PropsWithChildren<{ modal: ModalProps & CustomModalProps }>
) => {
  return (
    <Modal
      {...props.modal}
      title={
        <div
          className="flex justify-between items-center leading-10 -ml-6 -mr-6 -mt-6 px-6 rounded-t-md mb-2 text-white"
          style={{
            background: '#60a3ce',
            cursor: 'pointer',
          }}
        >
          <span>{props.modal.title}</span>
          <XMarkIcon
            className="w-5 h-5"
            onClick={(e) =>
              props.modal.onCancel?.(
                e as unknown as React.MouseEvent<HTMLButtonElement>
              )
            }
          />
        </div>
      }
    >
      <>
        <div className="mb-3">{props.modal.subTitle}</div>
        {props.children}
      </>
    </Modal>
  );
};
