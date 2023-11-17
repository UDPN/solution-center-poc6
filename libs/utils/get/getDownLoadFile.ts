/**
 * @description:
 * @type {Function}
 * @param url
 * @param name
 * @param param
 */
export const getDownLoadFile = (
  url: string,
  name: string,
  param: string
): void => {
  if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
    const a = document.createElement('a');
    a.download = name ? name : url.split('/')[url.split('/').length - 1];
    a.href = url;
    document.body.append(a);
    a.click();
    a.remove();
  } else {
    const iurl = '/api' + url + (param ? param : '');
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
    if (isAndroid) {
      const myFrame = document.createElement('iframe');
      myFrame.src = iurl;
      myFrame.style.display = 'none';
      document.body.appendChild(myFrame);
    } else if (isiOS) {
      location.href = iurl;
    } else {
      location.href = iurl;
    }
  }
};
