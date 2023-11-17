/**
 * @description: t('note_0005')
 * @type {Function}
 * @returns {string | Boolean} (str: unknown, restr?: boolean) => unknown
 */
export const isNotEmpty: <T, U>(str: T, restr?: U) => T | U | false = (
  str,
  restr
) => {
  if (str === undefined || str === null) return restr || false;
  if ((str + '').trim() === '') return restr || false;
  return str;
};
