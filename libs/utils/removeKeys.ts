/**
 * @description
 * @type {Function}
 * @returns {Function}
 */
export function removeKeys(obj: { [s: string]: unknown }) {
  const keys = Object.keys(obj);
  keys.map((item: string) => {
    if (!obj[item]) {
      delete obj[item];
    }
  });
  return obj;
}
