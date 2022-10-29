/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string;}
  let tempStr = '';
  let tempArrOfIndex = [];
  let index = 0;
  let stringArr = [...string];
  let result = [];
  // в данном цикле получаем массив длинн
  // строка 'aaabbaa'  => [3,2,2]
  for (let i = 0; i < stringArr.length; i++) {
    if (tempStr === '') {
      tempStr = stringArr[i];
      index++;
    } else if (tempStr === stringArr[i]) {
      index++;
    } else {
      tempArrOfIndex.push(index);
      index = 1;
      tempStr = stringArr[i];
    }
    if (i === stringArr.length - 1) {
      tempArrOfIndex.push(index);
    }
  }
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
