import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import copyClipboard from 'copy-to-clipboard';
import { getLS, showMessage } from 'libs/utils';
import {
  Fragment,
  Ref,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useSWR from 'swr';
import { CustomTableProps } from './CustomTableProps';
import { TailwindUIMenu } from './tailwindui';
import { useHook } from './useHook';

const { confirm } = Modal;
const classNamePx = 'px-7';
// eslint-disable-next-line @typescript-eslint/ban-types
const Custom_Table: (
  props: PropsWithChildren<CustomTableProps>,
  ref: Ref<unknown> | undefined
) => JSX.Element = (
  { url, title, extra, form, table, shadow },
  ref: Ref<unknown> | undefined
) => {
  const { t } = useHook();
  const [thisform] = Form.useForm();
  const [param, setParam] = useState({
    page: {
      pageSize: 10,
      pageNum: 1,
    },
    data: form.initialValues || {},
  });

  const { data: tableData, isLoading, mutate } = useSWR([url, param]);

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  useImperativeHandle(ref, () => ({
    mutate: () => {
      mutate();
    },
  }));

  const [userPermission, setUserPermission] = useState<string[]>([]);
  useEffect(() => {
    setUserPermission(getLS('userPermission'));
  }, []);

  const onChange = useCallback(
    (pagination: TablePaginationConfig) => {
      setParam({
        ...param,
        page: {
          pageSize: pagination.pageSize || 10,
          pageNum: pagination.current || 1,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [param]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFinish = useCallback(() => {
    const values = (form.form ?? thisform).getFieldsValue();
    const _values: BCMP.Objects = {};
    Object.keys(values).forEach((item) => {
      if (item.indexOf('-') < 0) {
        values[item] && (_values[item] = values[item] || '');
      } else {
        const keys = item.split('-');
        _values[keys[0]] = values[item]
          ? values[item][0].format('YYYY-MM-DD')
          : '';
        _values[keys[1]] = values[item]
          ? values[item][1].format('YYYY-MM-DD')
          : '';
      }
    });
    if (form.initialValues !== undefined) {
      Object.keys(form.initialValues).forEach((item) => {
        _values[item] = (form.initialValues as BCMP.Objects)[item];
      });
    }

    setParam({ ...param, data: _values });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const headerNode = useMemo(
    () => (
      <>
        {title || extra ? (
          <div
            className={
              'text-sm flex justify-between items-center border-0 border-b border-solid border-b-gray-100 py-3 ' +
              classNamePx
            }
          >
            <div>{title}</div>
            <div>{extra}</div>
          </div>
        ) : null}
      </>
    ),
    [title, extra]
  );

  const formNode = useMemo(() => {
    const { items, children, ...forms } = form;
    let show = false;
    const AsNode = (
      <Fragment>
        <Form
          {...forms}
          form={forms.form ?? thisform}
          onFinish={onFinish}
          labelCol={forms.labelCol || { flex: '6rem' }}
          className={forms.className}
        >
          <div
            className={
              'grid grid-cols-2 xl:grid-cols-3 gap-8 py-11 ' + classNamePx
            }
          >
            {items.map((_item) => {
              show = !_item.hidden;
              const chail =
                _item.type === 'Input' ? (
                  <Input className="w-full" />
                ) : _item.type === 'Select' ? (
                  <Select
                    className="w-full"
                    fieldNames={_item.fieldNames}
                    options={_item.options}
                  />
                ) : (
                  <DatePicker.RangePicker className="w-full" />
                );
              return (
                <Form.Item
                  {..._item}
                  key={String(_item.name)}
                  name={String(_item.name)}
                  label={_item.label}
                >
                  {chail}
                </Form.Item>
              );
            })}

            <Fragment>{children as ReactNode}</Fragment>
            {!show ? (
              false
            ) : (
              <Form.Item
                className="col-start-2 xl:col-start-3"
                label=" "
                colon={false}
              >
                <div className="space-x-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // className="font-bold"
                  >
                    {t('PUB_Query')}
                  </Button>
                  <Button
                    type="link"
                    htmlType="reset"
                    className="text-theme underline"
                  >
                    {t('PUB_Reset')}
                  </Button>
                </div>
              </Form.Item>
            )}
          </div>
        </Form>
      </Fragment>
    );
    if (show) return AsNode;
    return <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <Fragment>
      <div>
        <div className="bg-white shadow rounded-lg">
          {headerNode}
          {formNode}
        </div>
        <div
          className={'rounded-lg mt-4 bg-white ' + (!shadow ? '' : 'shadow')}
        >
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  colorFillAlter:
                    process.env.NEXT_PUBLIC_SYS_ENV === 'Manage'
                      ? '#F0F2F8'
                      : '#E7F3FF',
                },
              },
            }}
          >
            <Table
              {...table}
              className="mx-6"
              columns={[
                ...(table.columns || []).map((item) => ({
                  ...item,
                  ellipsis: true,
                  onHeaderCell: () => ({ className: '!font-normal' }),
                  render: (_: BCMP.ANY, _data: BCMP.ANY, index: BCMP.ANY) => {
                    return (
                      <Tooltip
                        placement="top"
                        title={
                          <span>
                            {item.render ? item.render(_, _data, index) : _}
                            <span
                              className="ml-1 cursor-pointer text-blue-400"
                              onClick={() => {
                                copyClipboard(
                                  item.render ? item.render(_, _data, index) : _
                                );
                                showMessage(
                                  t('PUB_Success').replace(
                                    '****',
                                    t('PUB_Copy')
                                  ),
                                  'success'
                                );
                              }}
                            >
                              {t('PUB_Copy')}
                            </span>
                          </span>
                        }
                      >
                        {item.render ? item.render(_, _data, index) : _}
                      </Tooltip>
                    );
                  },
                })),
                ...(tableData?.rows &&
                tableData?.rows.length &&
                table.actions(tableData?.rows[0]).length > 0
                  ? ([
                      {
                        title: t('PUB_Action'),
                        align: 'center',
                        width: '8rem',
                        onHeaderCell: () => ({ className: '!font-normal' }),
                        render: (_, _data) => {
                          let classNames = '';
                          const actionArr = table
                            .actions(_data)
                            .filter((item) => {
                              const boo =
                                !item?.disabled &&
                                (process.env.NEXT_PUBLIC_SYS_ENV === 'Manage'
                                  ? userPermission?.indexOf(item?.limit + '') >=
                                      0 || item?.limit == 'OS_P_show'
                                  : true);
                              if (boo && item.key.indexOf('Examine') > -1)
                                classNames = 'text-red-700';
                              return boo;
                            });
                          return (
                            <div className="flex items-center justify-center">
                              {/* {actionArr
                          .filter(
                            (_, _in) => _in < (actionArr.length > 3 ? 2 : 3)
                          )
                          .map((actionItem) => {
                            return (
                              <Button
                                className="flex items-center px-1"
                                onClick={() => {
                                  if (!actionItem.confimStr) {
                                    table.actionClick(
                                      _data,
                                      actionItem.key + ''
                                    );
                                  } else {
                                    confirm({
                                      title: actionItem.label,
                                      // icon: <ExclamationCircleFilled />,
                                      content: actionItem.confimStr?.replace(
                                        '****',
                                        actionItem.label as string
                                      ),
                                      onOk() {
                                        return new Promise(
                                          (resolve, reject) => {
                                            const prom = table.actionClick(
                                              _data,
                                              actionItem.key + ''
                                            );
                                            prom &&
                                              prom.then((res) => {
                                                if (res.data.code === '0')
                                                  mutate();
                                                resolve(res.data.code);
                                              });
                                          }
                                        );
                                      },
                                      // onCancel() {},
                                    });
                                  }
                                }}
                                type="link"
                                key={actionItem.key}
                              >
                                {getIcon(actionItem.key)}
                                {actionItem.label}
                              </Button>
                            );
                          })} */}
                              {
                                <TailwindUIMenu
                                  title={
                                    <EllipsisHorizontalIcon
                                      className={'w-6 h-6 ' + classNames}
                                    />
                                  }
                                  items={actionArr}
                                  onClick={(e) => {
                                    return table.actionClick(_data, e.key);
                                  }}
                                  callback={mutate}
                                />
                              }
                            </div>
                          );
                        },
                      },
                    ] as ColumnsType<BCMP.Objects>)
                  : ([] as ColumnsType<BCMP.Objects>)),
              ]}
              loading={isLoading}
              dataSource={tableData?.rows}
              pagination={
                table.pagination === false
                  ? false
                  : {
                      className: 'pr-7',
                      total: tableData?.page && tableData?.page.total,
                      showQuickJumper: true,
                      defaultPageSize: 10,
                      defaultCurrent: 1,
                      current: param.page.pageNum,
                    }
              }
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </Fragment>
  );
};

export const CustomTableTitle = (props: {
  title: string;
  button?: {
    key: string;
    limit: string;
    onClick?: () => void;
    label: string;
    disabled?: boolean;
  }[];
}) => {
  const [userPermission, setUserPermission] = useState<string[]>([]);
  useEffect(() => {
    setUserPermission(getLS('userPermission'));
  }, []);
  return (
    <div className="flex justify-between items-center my-2">
      <div>{props?.title}</div>
      <div>
        {props.button
          ? props.button.map((butt) => {
              if (
                process.env.NEXT_PUBLIC_SYS_ENV === 'Manage'
                  ? userPermission?.indexOf(butt?.limit + '') >= 0 ||
                    butt?.limit == 'OS_P_show'
                  : true
              ) {
                return (
                  <Button
                    key={butt.key}
                    type="primary"
                    className="text-xs mx-2"
                    onClick={butt.onClick}
                    disabled={butt.disabled}
                  >
                    {butt.label}
                  </Button>
                );
              }
              return null;
            })
          : null}
      </div>
    </div>
  );
};

export const CustomTable = forwardRef(Custom_Table);

export const useCustomTable: <T>(
  data: CustomTableProps
) => CustomTableProps<T> & {
  ref: RefObject<{ mutate: () => void }>;
} = (data) => {
  const ref = useRef<{ mutate: () => void }>(null);

  const form = useMemo(() => {
    return data.form;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.form]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actions = useCallback(data.table.actions, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionClick = useCallback(data.table.actionClick, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => data.table.columns, []);

  return {
    ref,
    title: data.title,
    extra: data?.extra,
    url: data.url,
    form,
    table: {
      ...data.table,
      rowKey: data.table.rowKey,
      columns,
      actions,
      actionClick,
    },
  };
};
