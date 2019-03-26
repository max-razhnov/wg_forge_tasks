/**
 * Необходимо реализовать структуру данных типа Стек (Stack)
 * Добавление и извлечение элементов возможно только в конец/из конца стека соответственно.
 */

export default class Stack {
  /**
   * в качестве "памяти" используем массив
   */

  constructor() {
    this.list = [];
    /**
     * Мы должны иметь возможность узнать текущий размер стека.
     * Используем для этого свойство length
     */
    this.length = 0;
  }

  /**
   * Добавление элемента в стек.
   * Не забудьте про размер!
   */

  push(value) {
    this.list[this.length] = value;
    this.length++;
  }

  /**
   * Извлечение элемента из стека
   */

  pop() {
    if (this.length === 0) {
      return undefined;
    }
    else {
      let res = this.list[--this.length];
      delete this.list[this.length];
      this.list.length = this.length;
      return res;
    }
  }

  /**
   * Ещё добавим функцию, позволяющая получить текущий элемент, но не удаляя его из стека.
   */

  peek() {
    return this.list[this.length - 1];
  }
}
