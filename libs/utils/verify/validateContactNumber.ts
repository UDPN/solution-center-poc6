export const validateContactNumber = (val: string) => {
  return val.match(/^((\d+)|(\d+)-(\d+))$/);
};
