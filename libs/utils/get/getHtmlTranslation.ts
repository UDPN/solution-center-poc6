/**
 * @description: string -> html
 * @type {Function}
 * @returns {String}
 */
export const getHtmlTranslation = (data: string) => {
  data = data.replace(new RegExp('&amp;', 'g'), '&');
  data = data.replace(new RegExp('&amp;nbsp;', 'g'), ' ');
  data = data.replace(new RegExp('&nbsp;', 'g'), ' ');
  data = data.replace(new RegExp('＃', 'g'), ' #');
  data = data.replace(new RegExp('&gt;', 'g'), '>');
  data = data.replace(new RegExp('&lt;', 'g'), '<');
  data = data.replace(new RegExp(/<script/g), '<script1');
  data = data.replace(new RegExp(/<\/script/g), '</script1');
  data = data.replace(/(\d+)px/g, function (s) {
    s = s.replace('px', '');
    if (Number(s) > 2) {
      const value =
        Number(s) /
        Number(
          window.document.documentElement.style.fontSize.replace('px', '')
        );
      return value + 'rem';
    }
    return s + 'px';
  });
  return data;
};
