/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string;}
  let tempStr = string.length > 0 ? string[0] : '';
  let tempArrOfIndex = [];
  let index = string.length > 0 ? 1 : 0;
  let stringArr = [...string];
  let result = [];
  // в данном цикле получаем массив длинн
  // строка 'aaabbaa'  => [3,2,2]
  for (let i = 1; i < stringArr.length; i++) {
    if (tempStr === stringArr[i]) {
      index++;
    } else {
      tempArrOfIndex.push(index);
      index = 1;
      tempStr = stringArr[i];
    }
  }
  // эта строчка закидывает последний index в массив
  tempArrOfIndex.push(index);
  // тут зная длинну для каждой буквы - режем массив исходных символов на куски
  for (let len of tempArrOfIndex) {
    let removed = stringArr.splice(0, len);
    if (removed.length > size) {
      removed = removed.splice(0, size);
    }
    result = result.concat(removed);
  }
  return result.join('');
}
