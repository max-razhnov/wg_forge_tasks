/**
 * Задание: написать построитель SQL-запросов.
 * Данный модуль должен экспортировать функцию `query`, вызов которой должен возвращать новый экземпляр объекта query.
 * Например:
 * const q1 = query();
 * const q2 = query();
 * console.log(Object.is(q1, q2)) // false
 *
 * В качестве аргументов query может передаваться имя таблицы.
 * Тогда при дальнейшем составлении запроса вызовы метода from(tableName) игнорируются.
 *
 * У возвращаемого объекта должны быть следующие методы:
 *
 * select(arg1, arg2 ... argN) - может принимать список полей для выборки.
 * Аргументы должны иметь тип String. Если ни одного аргумента не передано должны быть получены все поля таблицы
 * Например:
 * q.select().from('users')
 * > SELECT * FROM users
 * q.select('id', 'name').from('users')
 * > SELECT id, name FROM users
 *
 * from(tableName: String) - указывает из какой таблицы получать данные.
 *
 * where(fieldName: String) - служит для задания условия фильтрации.
 * При множественном вызове метода where в одном запросе условия должны объединяться через логическое "И".
 * Метод where должен возвращать объект имеющий следующие методы:
 * orWhere(fieldName: String) - делает то же самое что where, но объединяет через "ИЛИ".
 * Метод where должен возвращать объект имеющий следующие методы:
 *
 * equals(value: any) - условие равенства
 * Например: SELECT * FROM student WHERE age = 42;
 *
 * in(values: array) - позволяет определить, совпадает ли значение объекта со значением в списке
 * Например: SELECT * FROM offices WHERE city IN ('Minsk', 'Nicosia', 'Seattle');
 *
 * gt(value: any) - условие больше '>'
 * gte(value: any) - условие больше или равно '>='
 * lt(value: any) -  условие меньше '<'
 * lte(value: any) -  условие меньше или равно '<='
 * between(from: any, to: any) -  условие нахождения значения поля в заданном диапазоне:
 * SELECT * FROM products WHERE price BETWEEN 4.95 AND 9.95;
 *
 * isNull() - условие отсутствия значения у поля
 *
 * not() - служит для задания противоположного.
 * После вызова not можно вызывать только те же методы, которые использует where для сравнения.
 *
 * q.select().from('users').where('name').not().equals('Vasya')
 *
 * Вызов not не может быть вызван более одного раза подряд:
 * q.select().from('users').where('name').not().not().equals('Vasya')
 *
 * Внимание: методы сравнения не могут быть вызваны до вызова метода where()!
 *
 * Получения строчного представления сконструированного SQL-запроса должно происходить при
 * вызове метода toString() у объекта query.
 * В конце строки SQL-запроса должен быть символ ';'
 *
 * Дополнительные задания:
 *
 * 1. Добавить в сигнатуру функии query второй опциональный аргумент options типа Object.
 * Если в options есть поле escapeNames со значением true, названия полей и таблиц должны быть обёрнуты в двойные кавычки:
 *
 * const q = query({escapeNames: true});
 * q.select('name').from('people').toString()
 * > SELECT "name" FROM "people";

 * const q = query('books', {escapeNames: true});
 * q.select('title').toString()
 * > SELECT "title" FROM "books";
 *
 * 2. Добавить возможность передавать в условия методов сравнения в качестве значения экземпляр запроса query.
 *
 * const q1 = query('users');
 * const admins = q1.select('id').where('role').equals('admin');
 * const q2 = query('posts');
 * const posts = q2.select().where('author_id').in(admins);
 * posts.toString();
 * > SELECT * FROM posts WHERE author_id IN (SELECT id FROM users WHERE role = 'admin');
 *
 * 3. Реализовать функциональность создания INSERT и DELETE запросов. Написать для них тесты.
 */

export default function query(tableName, options) {
  let selectFlagStatus = false;
  let tableNameFlagStatus = false;
  let fromFlagStatus = false;
  let whereFlagStatus = false;
  let orWhereFlagStatus = false;
  let notFlagStatus = false;
  let insertFlagStatus = false;
  let valuesFlagStatus = false
  let deleteFlagStatus = false;
  let quotes = '';
  let fromPar = [];
  let selectPar = [];
  let wherePar = [];
  let insertPar = [];
  let deletePar = [];
  let methodsForCondition = {
    equals: (value) => {
      let quotesValue;
      if (typeof value === 'number') {
        quotesValue = '';
        wherePar.push(`=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      else if (typeof value === 'object') {
        wherePar.push('=');
        wherePar.push(`(${value.toString().split(';')[0]})`);
      }
      else {
        quotesValue = '\'';
        wherePar.push(`=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      return obj;
    },
    gt: (value) => {
      let quotesValue;
      if (typeof value === 'number') {
        quotesValue = '';
        wherePar.push(`>`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      else if (typeof value === 'object') {
        wherePar.push('>');
        wherePar.push(`(${value.toString().split(';')[0]})`);
      }
      else {
        quotesValue = '\'';
        wherePar.push(`>`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      return obj;
    },
    gte: (value) => {
      let quotesValue;
      if (typeof value === 'number') {
        quotesValue = '';
        wherePar.push(`>=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      else if (typeof value === 'object') {
        wherePar.push('>=');
        wherePar.push(`(${value.toString().split(';')[0]})`);
      }
      else {
        quotesValue = '\'';
        wherePar.push(`>=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      return obj;
    },
    lt: (value) => {
      let quotesValue;
      if (typeof value === 'number') {
        quotesValue = '';
        wherePar.push(`<`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      else if (typeof value === 'object') {
        wherePar.push('<');
        wherePar.push(`(${value.toString().split(';')[0]})`);
      }
      else {
        quotesValue = '\'';
        wherePar.push(`<`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      return obj;
    },
    lte: (value) => {
      let quotesValue;
      if (typeof value === 'number') {
        quotesValue = '';
        wherePar.push(`<=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }
      else if (typeof value === 'object') {
        wherePar.push('<=');
        wherePar.push(`(${value.toString().split(';')[0]})`);
      }
      else {
        quotesValue = '\'';
        wherePar.push(`<=`);
        wherePar.push(`${quotesValue}${value}${quotesValue}`);
      }

      return obj;
    },
    between: (from, to) => {
      let quotesFrom = '';
      let quotesTo = '';
      if (typeof from === 'string') {
        quotesFrom = '\'';
      }
      if (typeof to === 'string') {
        quotesTo = '\'';
      }
      if (notFlagStatus) {
        let conditionValue = wherePar.pop();
        let notValueFromArray = wherePar.pop();
        wherePar.push(conditionValue);
        wherePar.push(notValueFromArray);
      }
      let arr = ['BETWEEN', `${quotesFrom}${from}${quotesFrom}`, 'AND', `${quotesTo}${to}${quotesTo}`];
      wherePar.push(...arr);
      return obj;
    },
    isNull: () => {
      if (notFlagStatus) {
        let conditionValue = wherePar.pop();
        let notValueFromArray = wherePar.pop();
        let arr = [conditionValue, 'IS', notValueFromArray, 'NULL'];
        wherePar.push(...arr);
      }
      else {
        wherePar.push('IS NULL');
      }
      return obj;
    },
    in: (values) => {
      if (values instanceof Array && values.length !== 0) {
        let arr = [];
        let quotesValue;
        for (let i = 0; i < values.length; i++) {
          if (typeof values[i] === 'string') {
            quotesValue = '\'';
          }
          else {
            quotesValue = '';
          }
          if (i !== values.length - 1) {
            arr.push(`${quotesValue}${values[i]}${quotesValue},`);
          }
          else {
            arr.push(`${quotesValue}${values[i]}${quotesValue}`);
          }
        }
        if (notFlagStatus) {
          let conditionValue = wherePar.pop();
          let notValueFromArray = wherePar.pop();
          wherePar.push(conditionValue);
          wherePar.push(notValueFromArray);
        }
        wherePar.push('IN');
        wherePar.push(`(${arr.join(' ')})`);
      }
      else if (typeof values === 'object') {
        wherePar.push('IN');
        wherePar.push(`(${values.toString().split(';')[0]})`);
      }
      else {
        throw new Error('error: values should be an array');
      }
      return obj;
    },
    not: () => {
      if (!notFlagStatus) {
        notFlagStatus = true;
        let lastValue = wherePar.pop();
        wherePar.push('NOT');
        wherePar.push(lastValue);
        return methodsForCondition;
      }
      else {
        throw new Error('error: could not place \'not\' after \'not\'');
      }
    }
  }

  let obj = {
    select: (...args) => {
      if (typeof tableName === 'string' && tableName.length !== 0) {
        tableNameFlagStatus = true;
      }
      if ((typeof options === 'object' && options.escapeNames) || (typeof tableName === 'object' && tableName.escapeNames)) {
        quotes = '\"';
      }
      let arr = [...args];
      if (!selectFlagStatus) {
        selectPar.push('SELECT');
        if (arr.length !== 0) {
          for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'string') {
              if (i !== arr.length - 1) {
                selectPar.push(`${quotes}${arr[i]}${quotes},`);
              }
              else {
                selectPar.push(`${quotes}${arr[i]}${quotes}`);
              }
            }
          }
        }
        else {
          selectPar.push(`${quotes}*${quotes}`);
        }
        selectFlagStatus = true;
        return obj;
      }
      else {
        throw new Error('two select methods!');
      }
    },
    from: (fieldName) => {
      if (!fromFlagStatus) {
        if (tableNameFlagStatus) {
          fromPar.push(`FROM`);
          fromPar.push(`${quotes}${tableName}${quotes}`);
        }
        else if (typeof fieldName === 'string' && fieldName.length !== 0) {
          fromPar.push(`FROM`);
          fromPar.push(`${quotes}${fieldName}${quotes}`);
        }
        else {
          throw new Error('not string parameter or empty string!');
        }
        fromFlagStatus = true;
        return obj;
      }
      else {
        return obj;
      }
    },
    where: (fieldName) => {
      if (typeof fieldName === 'string' && fieldName.length !== 0) {
        if (deleteFlagStatus) {
          wherePar = [];
          wherePar.push(`WHERE`);
          wherePar.push(fieldName);
        }
        else if (selectFlagStatus) {
          if (!whereFlagStatus && !orWhereFlagStatus) {
            wherePar.push(`WHERE`);
            wherePar.push(fieldName);
          }
          else if ((whereFlagStatus && !orWhereFlagStatus) || (!whereFlagStatus && orWhereFlagStatus) || (whereFlagStatus && orWhereFlagStatus)) {
            wherePar.push(`AND`);
            wherePar.push(fieldName);
          }
          whereFlagStatus = true;
          notFlagStatus = false;
        }
        else if (deleteFlagStatus) {
          debugger
          wherePar = [];
          wherePar.push(`WHERE`);
          wherePar.push(fieldName);
        }
        else {
        }
        return methodsForCondition;
      }
      else {
        throw new Error('not string or empty fieldName ');
      }
    },
    orWhere: (fieldName) => {
      if (typeof fieldName === 'string' && fieldName.length !== 0) {
        if (!whereFlagStatus && !orWhereFlagStatus) {
          wherePar.push('WHERE');
          wherePar.push(fieldName);
        }
        else if (orWhereFlagStatus || whereFlagStatus) {
          wherePar.push('OR');
          wherePar.push(fieldName);
        }
        notFlagStatus = false;
        orWhereFlagStatus = true;
      }
      else {
        return new Error('not string or empty fieldName');
      }
      return methodsForCondition;
    },
    insert: (tableName, fieldName) => {
      let arr = [];
      if (typeof tableName === 'string' && tableName.length !== 0) {
        if (!insertFlagStatus) {
          insertPar.push('INSERT INTO');
          insertPar.push(tableName);
          if (fieldName instanceof Array) {
            let quotesValue;
            for (let i = 0; i < fieldName.length; i++) {
              if (typeof fieldName[i] === 'string') {
                quotesValue = '\'';
              }
              else {
                quotesValue = '';
              }
              if (i !== fieldName.length - 1) {
                arr.push(`${quotesValue}${fieldName[i]}${quotesValue},`);
              }
              else {
                arr.push(`${quotesValue}${fieldName[i]}${quotesValue}`);
              }
            }
            insertPar.push(`(${arr.join(' ')})`);
          }
          insertFlagStatus = true;
        }
        else {
          throw new Error('two insert methods');
        }
      }
      else {
        throw new Error('not string or empty fieldName');
      }
      return obj;
    },
    values: (fieldName) => {
      if (fieldName instanceof Array) {
        if (!deleteFlagStatus) {
          if (!valuesFlagStatus) {
            insertPar.push('VALUES');
            let arr = [];
            let quotesValue;
            for (let i = 0; i < fieldName.length; i++) {
              if (typeof fieldName[i] === 'string') {
                quotesValue = '\'';
              }
              else {
                quotesValue = '';
              }
              if (i !== fieldName.length - 1) {
                arr.push(`${quotesValue}${fieldName[i]}${quotesValue},`);
              }
              else {
                arr.push(`${quotesValue}${fieldName[i]}${quotesValue}`);
              }
            }
            insertPar.push(`(${arr.join(' ')})`);
            valuesFlagStatus = true;
            return obj;
          }
          else {
            throw new Error('two values methods');
          }
        }
        else {
          throw new Error(`values can't be called before delete`);
        }
      }
      else {
        throw new Error('fieldName not array type');
      }
    },
    delete: (fieldName) => {
      if (typeof fieldName === 'string' && fieldName.length !== 0) {
        deletePar.push(`DELETE FROM ${fieldName}`);
        deleteFlagStatus = true;
      }
      else {
        throw new Error('not string or empty fieldName');
      }
      return obj;
    },
    toString: () => {
      let arr = [];
      let str;
      if (selectFlagStatus) {
        arr.push(...selectPar);
      }
      if (tableNameFlagStatus && !fromFlagStatus) {
        if (fromPar.length === 0) {
          arr.push(`FROM`);
          arr.push(`${quotes}${tableName}${quotes}`);
        }
        else {
          arr.push(...fromPar);
        }
      }
      else if (fromFlagStatus) {
        arr.push(...fromPar);
      }
      if (whereFlagStatus || orWhereFlagStatus) {
        arr.push(...wherePar);
      }
      if (insertFlagStatus) {
        arr = [];
        arr.push(...insertPar);
      }
      if (deleteFlagStatus) {
        arr = [];
        arr.push(...deletePar);
        if (deleteFlagStatus) {
          arr.push(...wherePar);
        }
      }
      str = `${arr.join(' ')};`;
      return str;
    }
  }
  fromFlagStatus = false;
  whereFlagStatus = false;
  orWhereFlagStatus = false
  notFlagStatus = false;
  selectFlagStatus = false;
  tableNameFlagStatus = false;
  notFlagStatus = false;
  insertFlagStatus = false;
  valuesFlagStatus = false;
  deleteFlagStatus = false;
  return obj;
}
