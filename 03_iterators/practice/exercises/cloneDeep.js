/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function cloneDeep(srcObj) {
  let dst = {};
  for (let key in srcObj) {
    if (typeof srcObj[key] === 'object') {
      dst[key] = cloneDeep(srcObj[key]);
    }
    else {
      dst[key] = srcObj[key];
    }
  }
  return dst;
}