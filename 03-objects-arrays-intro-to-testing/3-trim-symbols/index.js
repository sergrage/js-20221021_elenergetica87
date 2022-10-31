/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string;}
  if (string === '') { return '';}
  const arrOfChar = [];
  let char = string[0];
  let stringPath = string[0];
  for (let i = 1; i < string.length; i++) {
    if (string[i] === char) {
      stringPath = stringPath + char;
    } else {
      arrOfChar.push(stringPath);
      char = string[i];
      stringPath = string[i];
    }
  }
  arrOfChar.push(stringPath);

  let part = [];
  let result = '';
  for (let str of arrOfChar) {
    part = str.length > size ? str.substr(0, size) : str;
    result = result + part;
  }
  return result;
}
