/*
 * @Author: W·S
 * @Date: 2022-12-08 15:38:44
 * @LastEditors: W·S
 * @LastEditTime: 2023-03-25 15:12:51
 * @Description: Description
 */

/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */
import type { IncomingMessage } from 'http';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import type { NextPageContext } from 'next/types';
import type { BaseContext } from 'next/dist/shared/lib/utils';
import type {
  ComponentType,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import type { DefaultOptionType as DefaultOptionType1 } from 'antd/lib/select';
import type { ColumnType } from 'antd/lib/table';
import type { TextAreaProps as TextAreaProps1 } from 'antd/lib/input';
import type { AxiosPromise } from 'axios';
import { ParsedUrlQuery } from 'querystring';

declare global {
  /** @Description global api type Start */
  export namespace BCMP {
    type ANY = any;
    type Objects = { [s: string]: any };
    type StatusType = { [s: string | number]: string };
    type GetFetchData<T, V> = (req: NextReq, param?: T) => Promise<V>;
    interface GetFetchDataSWR<T, V> {
      (req: NextReq, param?: T): Promise<V>;
      (req: null, param?: T): Promise<V['data']>;
    }
    type GetRequestData<T, V> = (param?: T) => AxiosPromise<V>;
    type NextReq = IncomingMessage & {
      cookies: NextApiRequestCookies;
    };
    namespace Actions {
      type Type<T extends keys> = KeyValuePair<T>;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      interface Interface<T> extends DefaultOptionType1 {
        code: T;
        value: T;
        limit: string;
        label: string;
      }
      type KeyValuePair<K extends keyof any = string> = Record<K>;
      type Record<K extends keyof any> = {
        [P in K]: Interface<P>;
      };
      type keys =
        | 'New'
        /** 查看 */
        | 'View'
        | 'Edit' // 编辑
        | 'Delete' // 删除
        | 'Enable' //启用
        | 'Disable' // 禁用
        | 'Redeploy' // 重新部署
        | 'DeploymentDetails' // 部署详情
        | 'RunInfo' // 运行信息
        | 'Examine' // 审核
        | 'AppUpgrade' // 应用升级
        | 'Upgrade' // 配置升级
        | 'Organization' // 组织管理
        | 'Detail' // 详情
        | 'Uninstall' // 卸载
        | 'export' // 导入
        | 'Download' // 下载
        | 'Reset' // 重置
        | 'Cancellation' // 注销
        | 'cancellation' // 注销
        | 'manualDeploy' // 手动部署
        | 'RenewContract' // 更新合约
        | 'ContractUpdateHistory' // 合约升级历史
        | 'ContractUpdate' //合约升级
        | 'Publish' // 公开
        | 'UnPublish' // 取消公开
        | 'Pay' // 支付
        | 'DownloadCertificate' // 下载证书
        | 'UpdateCertificate' // 更新证书
        | 'EditRole' // 编辑角色
        | 'AccessSetting' // 接入设置
        | 'DownloadAccess' // 下载应用接入配置参数
        | 'ApplyforParticipation' // 申请参与
        | 'Withdraw' // 撤回
        | 'InviteParticipation' // 邀请参与
        | 'UnFreeze' // 解冻
        | 'Freeze'; // 冻结
    }
  }

  export interface PropTypesValidator {
    (
      props: {
        [key: string]: unknown;
      },
      propName: string,
      componentName: string,
      location: string,
      propFullName: string
    ): Error | null;
  }

  type NextComponentType<
    C extends BaseContext = NextPageContext,
    IP = {},
    P = {}
  > = ComponentType<P> & {
    /**
     * Used for initial page load data population. Data returned from `getInitialProps` is serialized when server rendered.
     * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
     * @param context
     */
    getServerSideProps?(context: C): IP | Promise<IP>;
    getStaticProps?(context: C): IP | Promise<IP>;
    getLayout?(page: JSX.Element): JSX.Element;
  };
  export type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P & { query: ParsedUrlQuery }
  >;

  export type ReactNode =
    | string
    | number
    | boolean
    | ReactElement
    | ReactFragment
    | ReactPortal
    | null
    | undefined;

  export type PropsWithChildren<P = {}> = P & {
    children?: ReactNode | undefined;
  };

  /** @Description global api type End */
  export type GetServerSideProps = import('next/types').GetServerSideProps;
  export type GetStaticProps = import('next/types').GetStaticProps;
  export type NextApiRequest =
    import('next/dist/shared/lib/utils').NextApiRequest;
  export type NextApiResponse =
    import('next/dist/shared/lib/utils').NextApiResponse;

  // export type ColumnProps = ColumnProps1<any>[];
  export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
    children?: null;
  }
  export type TextAreaProps = TextAreaProps1;
  export type AffixProps = import('antd').AffixProps;
  export type FormItemProps = import('antd').FormItemProps;
  export type MenuProps = import('antd').MenuProps;
  export type PaginationProps = import('antd').PaginationProps;
  export type CheckboxProps = import('antd').CheckboxProps;
  export type DatePickerProps = import('antd').DatePickerProps;
  export type FormProps = import('antd').FormProps;
  export type InputProps = import('antd').InputProps;
  export type InputNumberProps = import('antd').InputNumberProps;
  export type RadioProps = import('antd').RadioProps;
  export type RadioGroupProps = import('antd').RadioGroupProps;
  export type SelectProps = import('antd').SelectProps;
  export type SwitchProps = import('antd').SwitchProps;
  export type TreeSelectProps = import('antd').TreeSelectProps;
  export type UploadProps = import('antd').UploadProps;
  export type AvatarProps = import('antd').AvatarProps;
  export type CardProps = import('antd').CardProps;
  export type CollapseProps = import('antd').CollapseProps;
  export type DescriptionsProps = import('antd').DescriptionsProps;
  export type EmptyProps = import('antd').EmptyProps;
  export type ImageProps = import('antd').ImageProps;
  export type ResultProps = import('antd').ResultProps;
  export type TableProps = import('antd').TableProps<any>;
  export type TagProps = import('antd').TagProps;
  export type TreeProps = import('antd').TreeProps;
  export type DropdownProps = import('antd').DropdownProps;
  export type CascaderProps = import('antd').CascaderProps<any>;
  export type ButtonProps = import('antd').ButtonProps;
  export type BreadcrumbProps = import('antd').BreadcrumbProps;
  export type PopconfirmProps = import('antd').PopconfirmProps;
  export type TabsProps = import('antd').TabsProps;
  export type BaseOptionType = import('antd/lib/select').BaseOptionType;
  export type DefaultOptionType = import('antd/lib/select').DefaultOptionType;
}
