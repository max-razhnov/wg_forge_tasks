/*
Implement a functuion which receives an array and another function
and apply passed function to each elemnt of array

Example:
[1, 2, 3], x => x + 1  yields [2, 3 ,4]
*/
export function map(array, func) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    arr.push(func(array[i], i, this));
  }
  return arr;
}

/*
Write a function which revices a function and array and
returns new array with elements matched to filter

['foo', 1, null, 'bar'], x => typeof x === 'string' yields ['foo', bar]

[1, 2, 3, 4, 5, 6], x => x % 2 == 0 yields [2, 4, 6]

*/
export function filter(array, fn) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let res = fn(array[i], i, arr);
    if (res) {
      arr.push(array[i]);
    }
  }
  return arr;
}

/*
Implement a function that returns a function which yields a fibonaccy number

Example:
const gen = fibGenerator()
gen() -> 0
gen() -> 1
gen() -> 1
gen() -> 2
gen() -> 3
gen() -> 5
...
*/
export function fibGenerator() {
  let b = 1;
  let a = 0;
  let f = 1;
  return function () {
    f = a + b;
    b = a;
    a = f;
    return b;
  }
}

/*
Write a function that recieves a function and other
arguments and return a function with bounded arguments

Examples:
const sum = (x, y) => x + y
const addOne = partial(sum, 1)
addOne(2) -> 3
const sumTwoAndFour = partial(sum, 2, 4)
sumTwoAndFour() // 6

Note: function has a length property which shows how many arguments it receives
*/
export function partial(fn, ...args) {
  return function () {
    return fn.call(this, ...args, ...arguments);
  }
}
