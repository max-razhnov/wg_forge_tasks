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

function smoosh(array) {
  try {
    let flagStatus = false
    const flatten = [];
    for (let value of array) {
      if (value instanceof Array) {
        flagStatus = true
        flatten.push(...value);
      }
      else {
        flatten.push(value);
      }
    }
    if (flagStatus) {
      return smoosh(flatten);
    }
    else {
      return flatten;
    }
  } catch (error) {
    return error.message = "argument should be an array";
  }
}

function squeeze(array) {
  try {
    let lengthArray = array.length;
    let flagStatus = true;
    while (flagStatus) {
      flagStatus = false;
      for (let i = 0; i < lengthArray; i++) {
        if (array[i].length) {
          flagStatus = true
          array.push(...array[i]);
        }
        else {
          array.push(array[i]);
        }
      }
      array.splice(0, lengthArray);
      lengthArray = array.length;
    }
    return array;
  } catch (error) {
    return error.message = "argument should be an array";
  }
}

export { smoosh, squeeze };
