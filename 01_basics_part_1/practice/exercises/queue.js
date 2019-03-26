/**
 * Необходимо реализовать структуру данных Очередь.
 * Очередь должна реализовывать принцип FIFO - First-In-First-Out.
 */

export default class Queue {
  /**
   * в качестве "памяти" используем массив
   */

  constructor() {
    this.list = [];
    /**
     * У любой очереди должна быть длинна!
     */
    this.length = 0;
  }

  /**
   * Метод для добавления элемента в конец очереди.
   */

  enqueue(value) {
    this.list[this.length] = value;
    this.length++;
  }

  /**
   * Метод для извлечения элемента из очереди.
   * Вместо извлечения из конца очереди мы должны извлечь элемент из начала очереди!
   */

  dequeue() {
    if (this.length === 0) {
      return undefined;
    }
    else {
      let res = this.list[this.length - this.length];
      let arr = [];
      for (let i = this.length - 1; i > this.length - this.length; i--) {
        arr[i - 1] = this.list[i];
      }
      this.length--;
      delete this.list[this.length - this.length];
      this.list = [...arr];
      return res;
    }
  }

  /**
   * Метод для получения элемента из очереди.
   * Принцип такой же как и у *deque*, только в этом случае элемент не удаляется из очереди.
   */

  peek() {
    if (this.length === 0) {
      return undefined;
    }
    else {
      return this.list[++this.length - this.length];
    }
  }
}
