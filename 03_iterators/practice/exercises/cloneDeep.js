/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function cloneDeep(srcObj) {
  let dst = {};
  Object.keys(srcObj).forEach((key) => {
    if (srcObj[key] instanceof Object) {
      dst[key] = cloneDeep(srcObj[key]);
    }
    else {
      dst[key] = srcObj[key];
    }
  });
  return dst;
}