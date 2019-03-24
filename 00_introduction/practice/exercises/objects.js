/*
collect array's element to object with first letters as keys
and sorted words array as a value

Example:
['test', 'foo', 'bar', 'farm', 'trust', 'ham', 'harm'] -> {
  't': ['test', 'trust'],
  'f': ['farm', 'foo'],
  'b': ['bar'],
  'h': ['ham', 'harm'],
}
*/
export function collectByFirstLetter(...words) {
  let arr = [...words];
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i][0]] = [];
  }
  arr.sort();
  let arr1 = [];
  for (let key in obj) {
    for (let i = 0; i < arr.length; i++) {
      if (key === arr[i][0]) {
        arr1.push(arr[i]);
      }
    }
    obj[key] = arr1;
    arr1 = [];
  }
  return obj;
}

/*
Write a function which receives object and list of keys
and returns object with only keys passed in arguments.
unknown keys are ignored

Example:
({name: 'John', age: 42}, 'name') yields {name: 'John'}
*/
export function only(obj, ...keys) {
  let o = {};
  let args = [...keys];
  for (let key in obj) {
    for (let i = 0; i < args.length; i++) {
      if (key === args[i]) {
        o[key] = obj[key];
      }
    }
  }
  return o;
}

/*
Function counts words in given text.
returns an object with word as key and it's frequence as value

Note: It should ignore punctuation marks and uppercase symbols

Example:
'Awesome! Does it work? It should works' yields
{
  awesome: 1,
  test: 1,
  it: 2,
  should: 1,
  works: 1,
}
'' yields {}
*/
export function wordsCount(text) {
  let str = [...text].join('').toLowerCase().trim();
  let arr = [];
  let obj = {};
  let count = 0;
  if (str.length !== 0) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '?') {
        arr = str.split('?')
        str = arr.join('');
        i = 0;
      }
      else if (str[i] === '!') {
        arr = str.split('!');
        str = arr.join('');
        i = 0;
      }
      else if (str[i] === '.') {
        arr = str.split('.');
        str = arr.join('');
        i = 0;
      }
      else if (str[i] === ',') {
        arr = str.split(',');
        str = arr.join('');
        i = 0;
      }
    }
    arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = count;
    }
    for (let key in obj) {
      count = 0;
      arr.forEach((item) => {
        if (item === key) {
          count++;
        }
        obj[key] = count;
      })
    }
    return obj;
  } else {
    return obj;
  }
}


// Write a function's body which create an object for user representation
// It should contains method for password validation:
// password is weak if it contains only lowercase letters or only uppercase

// Example:
// const user = createUser('root', 'topsecret')
// user.login === 'root' // true
// user.password === 'topsecret' // true
// user.isWeakPassword() === true
// user.password = 'topSecreT'
// user.isWeakPassword() === false


export function createUser(login, password) {
  let obj = {
    login: login,
    password: password,
    isWeakPassword: () => {
      const reg = new RegExp('[a-z]');
      const reg2 = new RegExp('[A-Z]')
      let countUp = 0,
        countDown = 0;
      for (let key of password) {
        if (reg.test(key)) {
          countDown++;
        }
        else if (reg2.test(key)) {
          countUp++;
        }
      }
      if (countUp === obj.password.length || countDown === obj.password.length) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  return obj;
}
