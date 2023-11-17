export const validatePassWord = (val: string) => {
  if (
    val.includes('(') ||
    val.includes(')') ||
    val.includes('（') ||
    val.includes('）')
  )
    return false;
  return val.match(
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/
  );
};
