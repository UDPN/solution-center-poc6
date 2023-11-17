/**
 * @description: New Tab
 * @type {Function}
 * @param _url
 */
export const openNewWin = (_url: string): void => {
  if (_url.indexOf('http://') === 0 || _url.indexOf('https://') === 0) {
    const u = navigator.userAgent;
    // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
    if (isiOS) {
      window.location.href = _url;
    } else {
      const div: HTMLAnchorElement = window.document.createElement('a');
      div.id = 'newWindow';
      div.href = 'javascript:void(0)';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      div.onclick = window.open(_url);
      document.body.appendChild(div);
      setTimeout(function () {
        document.getElementById('newWindow')?.click();
      }, 500);
    }
  }
};
