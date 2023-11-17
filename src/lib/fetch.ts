/*
 * @Author: W·S
 * @Date: 2022-09-21 14:06:15
 * @LastEditors: W·S
 * @LastEditTime: 2023-03-30 14:16:03
 * @Description: Description
 */

/**
 * @description fetch 封装
 * @param {BCMP.NextReq} req
 * @param {string} url 接口地址
 * @param {(object | null)} [data] 传输的数据
 * @param {RequestInit} [option]
 * @returns {*}
 */
export const getFetch = async (
  req: BCMP.NextReq,
  url: string,
  data?: object | null,
  option?: RequestInit
) => {
  if (url.indexOf('http:') < 0 && url.indexOf('https:') < 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    url = global.NEXT_SERVICE_SERVER_URL + url;
  }

  const cookies: BCMP.Objects = {};
  req.headers.cookie?.split('; ').forEach((_item) => {
    cookies[_item.split('=')[0]] = _item.split('=')[1];
  });

  const method = option?.method || 'POST',
    headers =
      option?.headers ||
      new Headers({
        'Content-type': 'application/json',
        token: cookies.Token || '',
        language: 'zh-CN',
      });

  try {
    const feRes = await fetch(url, {
      body: data ? JSON.stringify(data) : null,
      method,
      headers,
      ...option,
    });
    const _data = await feRes.json();
    return _data;
  } catch (error) {
    return { code: 1, data: undefined };
  }
};
