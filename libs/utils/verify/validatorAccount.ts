/**
 * t('note_0010')
 * @returns {boolean}
 * t('note_0011')：false
 * @param account
 */
export const validatorAccount = (account: string) => {
  return account.match(/^[a-zA-Z][a-zA-Z0-9_]{5,24}$/);
};
