/**
 * Задание: написать функцию sleep, которая приостанавливает работу потока на
 * время переданное в аргументе. Время задаётся в секундах с точностью до 1 сек.
 * Если передан не валидный аргумент функция должна сразу завершить своё
 * выполнение и вернуть undefined.
 */

export default function sleep(delay) {
  let counter = 0;
  let str = '';
  if (arguments.length < 2) {
    str = `${delay}`;
  }
  else {
    str = `${[...arguments]}`;
  }
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '.' || str.charAt(i) === ',') {
      counter++;
    }
  }
  if (typeof delay === 'number' && delay > 0 && counter === 0) {
    let sumOfCurrentTimeAndDelay = Date.now() / 1000 + delay;
    while (Date.now() / 1000 < sumOfCurrentTimeAndDelay) {
    }
  }
  else {
    return undefined;
  }
}
