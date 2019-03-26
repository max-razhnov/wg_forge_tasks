/* eslint-disable filenames/match-regex */
/**
 * Необходимо реализовать хеш-таблицу, в которой в значения можно записывать данные любого типа.
 * Ключом должна быть строка.
 */

export default class HashTable {
  /**
   * в качестве "памяти" используем массив
   */
  constructor() {
    this.memory = [];
  }

  /**
   * Хеширующая функция.
   * Принимает ключ (тип строка) и возвращает уникальный адрес.
   * hashKey('abc') =>  17263
   * hashKey('xyz') => 283902
   */

  hashKey(key) {
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i][0] === key) {
        return this.memory[i][1];
      }
    }
  }

  /**
   * Метод для получения данных из хеш-таблицы по ключу.
   */

  get(key) {
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i][0] === key) {
        return this.memory[i][1];
      }
    }
  }

  /**
   * Добавляем значение в таблицу с заданным ключом.
   */

  set(key, value) {
    this.memory.push([key, value]);
  }

  /**
   * Функция удаления из хеш-таблицы.
   * Принимает ключ.
   */

  remove(key) {
    let newMem = []
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i][0] === key) {
        delete this.memory[i];
      }
    }
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] !== undefined) {
        newMem[i] = this.memory[i];
      }
    }
    this.memory = [...newMem];
  }
}
