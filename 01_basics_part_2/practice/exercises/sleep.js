/**
 * Задание: написать функцию sleep, которая приостанавливает работу потока на
 * время переданное в аргументе. Время задаётся в секундах с точностью до 1 сек.
 * Если передан не валидный аргумент функция должна сразу завершить своё
 * выполнение и вернуть undefined.
 */

export default function sleep(timeSleep) {
  if (timeSleep >= 0 && timeSleep <= 60 && `${timeSleep}`.length < 3) {
    let sumCurrentAndDelay = Math.round(new Date().getTime() / 1000) + timeSleep;
    while (new Date().getTime() / 1000 < sumCurrentAndDelay) {
    }
  }
  else {
    return undefined;
  }
}
