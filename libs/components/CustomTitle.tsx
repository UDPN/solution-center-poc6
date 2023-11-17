/*
 * @Author: zhoudandan
 * @Date: 2023-02-21 10:15:34
 * @LastEditors: Feix
 * @LastEditTime: 2023-04-15 14:39:55
 * @Description: Description
 */

export type CustomTitleProps = {
  className?: string;
  type?: 0 | 1 | 2;
  title?: ReactNode;
  extra?: ReactNode;
};

export const CustomTitle = (props: CustomTitleProps) => {
  return (
    <div
      className={
        'text-sm flex justify-between items-center border-0 border-b border-solid border-b-gray-100 rounded-tl-lg rounded-tr-lg bg-gray-50 py-3 px-4'
      }
    >
      <div className="text-fontTheme font-bold">{props?.title}</div>
      <div>{props?.extra}</div>
    </div>
  );
};
