/**
 * @description: t('note_0000')
 * @type {Function}
 * @param fn t('note_0001')
 * @param delay t('note_0002')
 * @returns {Function}
 */
export const getThrottleFn = (fn: () => void, delay: number): (() => void) => {
  let valid = true;
  return function () {
    if (!valid) {
      return false;
    }
    valid = false;
    fn();
    setTimeout(() => {
      valid = true;
    }, delay);
  };
};
