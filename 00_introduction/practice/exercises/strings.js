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
  return string.split(' ').filter(function (n) { return n != '' }).length;
}
