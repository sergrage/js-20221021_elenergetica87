/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArr = path.split('.');

  return function(obj) {
    let res = null;
    for (let path of pathArr) {
      if (res) {
        res = res[path];
      } else {
        res = obj[path];
      }
      if (res === undefined) { return undefined; }
    }
    return res;
  };
}
