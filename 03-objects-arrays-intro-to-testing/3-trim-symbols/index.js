/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string;}
  if (string === '') { return '';}
  const arrOfChar = string.match(/(.)\1*/g);
  let part = [];
  let result = '';
  for (let str of arrOfChar) {
    part = str.length > size ? str.substr(0, size) : str;
    result = result + part;
  }
  return result;
}
