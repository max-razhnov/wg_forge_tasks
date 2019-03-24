/*
write a function's body that concat all passed strings to one and returns it
*/
export function concat(...strings) {
  let str = [...strings].join('');
  return str;
}

/*
write a function's body that returns string
that contains element of initial strings with odd indexes

Example:
'abcd' -> 'ac'
'' -> ''
'test' -> 'ts'
*/
export function oddElements(string) {
  let str = '';
  for (let i = 0; i < string.length; i++) {
    if (i % 2 === 0 || i === 0) {
      str += string[i];
    }
  }
  return str;
}

/*
write a function's body that returns words count in passed string

Example:
'abcd' -> 1
'' -> 0
'foo bar' -> 2

Note: String has .split(separator) method where seprator is another string
*/
export function wordsCount(string) {
  return string.split(' ')
    .filter(function (n) { return n != '' })
    .length;
  // let count = 0;
  // let str = [...string].join('').trim();
  // str.trim();
  // let arr = str.split(',')
  // str = arr.join('');
  // if (str.length !== 0) {
  //   for (let i = 0; i < str.length; i++) {
  //     if (str[i] === '.') {
  //       arr = str.split('.');
  //       str = arr.join('');
  //       i = 0;
  //     }
  //     else if (str[i] === '?') {
  //       arr = str.split('?');
  //       str = arr.join('');
  //       i = 0;
  //     }
  //     else if (str[i] === '!') {
  //       arr = str.split('!');
  //       str = arr.join('');
  //       i = 0;
  //     }
  //     else if (arr[arr.length - 1] === '') {
  //       arr.pop()
  //     }
  //   }
  // }
  // else {
  //   count = str.length;
  // }
  // arr = str.split(' ');
  // count = arr.length;
  // return count;
}
