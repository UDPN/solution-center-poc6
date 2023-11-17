export const validateAmount = (val: string) => {
  return val.match(/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/);
};
