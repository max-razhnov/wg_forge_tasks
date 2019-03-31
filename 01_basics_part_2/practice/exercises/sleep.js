/**
 * Задание: написать функцию sleep, которая приостанавливает работу потока на
 * время переданное в аргументе. Время задаётся в секундах с точностью до 1 сек.
 * Если передан не валидный аргумент функция должна сразу завершить своё
 * выполнение и вернуть undefined.
 */

export default function sleep(timeSleep) {
  let count = 0;
  let str = '';
  if (arguments.length < 2) {
    str = `${timeSleep}`;
  }
  else {
    str = `${[...arguments]}`;
  }
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '.' || str.charAt(i) === ',') {
      count++;
    }
  }
  if (typeof timeSleep === 'number' && timeSleep > 0 && count === 0) {
    let sumCurrentAndDelay = (Date.now() / 1000) + timeSleep;
    while (Date.now() / 1000 < sumCurrentAndDelay) {
    }
  }
  else {
    return undefined;
  }
}
