/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string;}

  let char = string.length > 0 ? string[0] : ''; // сюда записываем символ. если есть, уже записываем первый.
  let arrOfCharLengths = [];// сюда складываем число символов идущих подряд
  let numberOfChar = string.length > 0 ? 1 : 0; //  число символов идущих подряд. если есть первйы символ, уже записываем 1.
  let result = [];

  let stringArr = [...string];
  // в данном цикле получаем массив длинн
  // строка "aaabbaa"  => [3,2,2]
  for (let i = 1; i < stringArr.length; i++) {
    if (char === stringArr[i]) {
      numberOfChar++;
    } else {
      arrOfCharLengths.push(numberOfChar);
      numberOfChar = 1;
      char = stringArr[i];
    }
  }
  // эта строчка закидывает последний numberOfChar в массив
  arrOfCharLengths.push(numberOfChar);

  // тут зная длинну для каждой буквы - режем массив исходных символов на куски
  for (let len of arrOfCharLengths) {
    let removed = stringArr.splice(0, len);
    if (removed.length > size) {
      removed = removed.splice(0, size);
    }
    result = result.concat(removed);
  }
  return result.join('');
}
