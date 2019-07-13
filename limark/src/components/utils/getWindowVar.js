/**
 * 获取window上的变量，获取window.a.b.c的语法糖，getWindowVar('a.b.c')
 * @param {String}
 * @returns {any}
 */
export const getWindowVar = (str) => {
  if ( typeof str != 'string') {
    throw new Error('param must be string');
  }
  const arr = str.split('.');
  let returned = window;
  while (arr.length) {
    let key = arr.shift();
    try {
      returned = returned[key];
    } catch (e) {
      // 出错时忽略
    }
  }
  return returned;
};
