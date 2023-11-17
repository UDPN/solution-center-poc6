/**
 * @description:
 * @type {Function}
 * @param fn
 * @param delay
 * @returns {Function}
 */
export const getDebounceFn = (fn: () => void, delay: number): (() => void) => {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout | undefined = undefined;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    } else {
      timer = setTimeout(fn, delay);
    }
  };
};
