/*
Given a list of strings, return the count of the number of
strings where the string length is 2 or more and the first
and last chars of the string are the same.

['abc', 'aa', 'bb'] yields 2
*/
export function matchEnds(words) {
  let newWords = [...words];
  let count = 0;
  for (let i = 0; i < newWords.length; i++) {
    if (newWords[i].charAt(0).toLowerCase() === newWords[i].charAt(newWords[i].length - 1).toLowerCase() && newWords[i].length >= 2) {
      count++;
    }
  }
  return count;
}

/*
Given an array of numbers, return new array where
first element is diffrence between maximum and minimum of passed array
last element is sum of minimum and maximum
and passed array in center
[1, 2, 3] yields [2, 1, 2, 3, 4]
[5, 2, 14] yields [12, 5, 2, 14, 16]
*/
export function addFirstAndLast(numbers) {
  let newNumbers = [...numbers];
  newNumbers.unshift(Math.max(...numbers) - Math.min(...numbers));
  newNumbers.push(Math.max(...numbers) + Math.min(...numbers));
  return newNumbers;
}

/*
Given a list of strings, return a list with the strings
in sorted order, except group all the strings that begin with 'x' first.
e.g. ['mix', 'xyz', 'apple', 'xanadu', 'aardvark'] yields
['xanadu', 'xyz', 'aardvark', 'apple', 'mix']
Hint: this can be done by making 2 lists and sorting each of them
before combining them.
*/
export function xLetterFirst(words) {
  let newWords = [],
    arrOfX = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].charAt(0).toLowerCase() === 'x') {
      arrOfX.push(words[i]);
    }
    else {
      newWords.push(words[i]);
    }
  }
  arrOfX.sort();
  newWords.sort();
  newWords.unshift(...arrOfX);
  return newWords;
}

/*
Given a list of non-empty arrays, return a list sorted in increasing
order by the last element in each tuple.
e.g. [[1, 7], [1, 3], [3, 4, 5], [2, 2]] yields
[[2, 2], [1, 3], [3, 4, 5], [1, 7]]
*/
export function sortByLast(nestedArrays) {
  let newNestedArrays = [],
    lastElems = [];
  for (let i = 0; i < nestedArrays.length; i++) {
    lastElems.push(nestedArrays[i][nestedArrays[i].length - 1]);
  }
  lastElems.sort();
  for (let i = 0; i < lastElems.length; i++) {
    for (let k = 0; k < nestedArrays.length; k++) {
      if (lastElems[i] === nestedArrays[k][nestedArrays[k].length - 1]) {
        newNestedArrays.push(nestedArrays[k]);
      }
    }
  }
  return newNestedArrays;
}
