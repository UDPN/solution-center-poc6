export const validateVersion = (val: string) => {
  return /^(V)|([0-9]\d|[0-9])(.([0-9]\d|\d)){2}$/.test(val);
};
