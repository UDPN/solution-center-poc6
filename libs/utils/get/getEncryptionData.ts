import CryptoJS from 'crypto-js';
import { isNotEmpty } from '../is/isNotEmpty';
let key = CryptoJS.enc.Utf8.parse('reddatespartan25');
const iv = CryptoJS.enc.Utf8.parse('hongzao25spartan');

/**
 * @description
 * @type {Function}
 * @param _data
 * @return
 */
export function getEncryptionData(_data: string | number, keys = ''): string {
  if (!isNotEmpty(_data)) return '';
  const srcs = CryptoJS.enc.Utf8.parse(_data + '');
  key = keys ? CryptoJS.enc.Utf8.parse(keys) : key;
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}
