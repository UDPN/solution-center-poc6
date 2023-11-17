import CryptoJS from 'crypto-js';
import { isNotEmpty } from '../is/isNotEmpty';
const key = CryptoJS.enc.Utf8.parse('reddatespartan25');
const iv = CryptoJS.enc.Utf8.parse('hongzao25spartan');

/**
 * @description:
 * @type {Function}
 * @param _data
 * @return
 */
export function getDecryptionData(_data: string | number): string {
  if (!isNotEmpty(_data)) return '';
  const encryptedHexStr = CryptoJS.enc.Hex.parse(_data + '');
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
