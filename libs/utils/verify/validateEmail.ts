export const validateEmail = (val: string) => {
  return val.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/);
};
