/**
 * Задача 1: написать функцию smoosh, которая принимает массив, "выравнивает" вложенные массивы
 * в одноуровневый массив и возвращает новый плоский массив.
 * Например:
 * smoosh([1, 2, [3, 4], 5])
 * > [1, 2, 3, 4, 5]
 * Входной массив может содержать массивы любого уровня вложенности.
 * Например: [[1, 2], [3, [4, [5]]]]
 *
 * Задача 2: написать функцию squeeze (по аналогии со smoosh) таким образом,
 * чтобы она модифицировала исходный массив, а не возвращала новый.
 *
 * Задача 3*: для функций smoosh и squeeze добавить валидацию входного параметра.
 * В случае, если на вход передан не массив функция должна выбросить исключение
 * с сообщением 'argument should be an array'.
 */

function smoosh(arr) {
  let counter = 0;
  const flatten = [];
  for (let value of arr) {
    if (value instanceof Array) {
      counter++;
      flatten.push(...value);
    }
    else {
      flatten.push(value);
    }
  }
  if (counter >= 1) {
    return smoosh(flatten);
  }
  else {
    return flatten;
  }
}

function squeeze() {
  // your code here
}

export { smoosh, squeeze };
