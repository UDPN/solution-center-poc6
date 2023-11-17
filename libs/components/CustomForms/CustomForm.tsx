/*
 * @Author: zhoudandan
 * @Date: 2023-03-14 11:33:03
 * @LastEditors: W·S
 * @LastEditTime: 2023-04-27 20:11:04
 * @Description: Description
 */
import { Form } from 'antd';

export const CustomForm = (props: PropsWithChildren<FormProps>) => {
  return (
    <Form
      {...props}
      labelCol={
        props.labelCol || {
          flex: '11rem',
          // xs: { span: 24 },
          // sm: { span: 5 },
          // lg: { flex: '12rem' },
          // xl: { span: 5 },
          // xxl: { span: 2 },
        }
      }
      wrapperCol={
        props.wrapperCol || {
          xs: { span: 24 },
          sm: { span: 18, offset: 1 },
          lg: { span: 15, offset: 1 },
          xl: { span: 12, offset: 1 },
          xxl: { span: 10, offset: 1 },
        }
      }
    >
      {props.children}
    </Form>
  );
};
