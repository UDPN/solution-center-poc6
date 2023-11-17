export const isValidEthAddress = (address: string): boolean => {
  const pattern = /^(0x)?[0-9a-fA-F]{40}$/;
  return pattern.test(address);
};
