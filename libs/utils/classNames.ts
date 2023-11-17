/**
 * @description:
 * className={classNames("text-center w-full","h-full m-auto")}
 */
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
