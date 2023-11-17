const enUS = {
  ...require('./public/locales/en-US/common.json'),
  ...require('./public/locales/en-US/login.json'),
  ...require('./public/locales/en-US/sys-role.json'),
  ...require('./public/locales/en-US/sys-user.json'),
};
const zhCN = {
  ...require('./public/locales/zh-CN/common.json'),
  ...require('./public/locales/zh-CN/login.json'),
  ...require('./public/locales/zh-CN/sys-role.json'),
  ...require('./public/locales/zh-CN/sys-user.json'),
};
for (const key in enUS) {
  console.log(`${key}==${zhCN?.[key] || ''}==${enUS?.[key] || ''}`);
}
