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
  const space = ' ';
  const SELECT_DEFAULT = 'SELECT';
  const FROM_DEFAULT = 'FROM';
  const WHERE_DEFAULT = 'WHERE';
  let quotes = '';
  let resultToString = '';
  let selectQuery = `${SELECT_DEFAULT}${space}`;
  let fromQuery = ` ${FROM_DEFAULT}${space}`;
  let whereQuery = `${space}${WHERE_DEFAULT}${space}`;
  let selectFlagStatus = false;
  let fromFlagStatus = false;
  let whereFlagStatus = false;
  let orwhereFlagStatus = false;
  let notFlagStatus = false;

  if ((typeof options === 'object' && options.escapeNames) || (typeof tableName === 'object' && tableName.escapeNames)) {
    quotes = '\'';
  }

  let methodsForCondition = {
    equals: (value) => {
      let q = '';
      if (typeof value === 'number') {
        whereQuery += space + '=' + space + q + value + q;
      }
      else if (typeof value === 'object') {
        subqueryFlagStatus = true;
        let str = value.toString().split(';')
        whereQuery += space + '=' + space + `(${str.join('')})`;
      }
      else {
        q = '\'';
        whereQuery += space + '=' + space + q + value + q;
      }
      return obj;
    },
    gt: (value) => {
      let q = '';
      if (typeof value === 'number') {
        whereQuery += space + '>' + space + q + value + q;
      }
      else if (typeof value === 'object') {
        subqueryFlagStatus = true;
        let str = value.toString().split(';')
        whereQuery += space + '>' + space + `(${str.join('')})`;
      }
      else {
        q = '\'';
        whereQuery += space + '>' + space + q + value + q;
      }
      return obj;
    },
    gte: (value) => {
      let q = '';
      if (typeof value === 'number') {
        whereQuery += space + '>=' + space + q + value + q;
      }
      else if (typeof value === 'object') {
        subqueryFlagStatus = true;
        let str = value.toString().split(';')
        whereQuery += space + '>=' + space + `(${str.join('')})`;
      }
      else {
        q = '\'';
        whereQuery += space + '>=' + space + q + value + q;
      }
      return obj;
    },
    lt: (value) => {
      let q = '';
      if (typeof value === 'number') {
        whereQuery += space + '<' + space + q + value + q;
      }
      else if (typeof value === 'object') {
        subqueryFlagStatus = true;
        let str = value.toString().split(';')
        whereQuery += space + '<' + space + `(${str.join('')})`;
      }
      else {
        q = '\'';
        whereQuery += space + '<' + space + q + value + q;
      }
      return obj;
    },
    lte: (value) => {
      let q = '';
      if (typeof value === 'number') {
        whereQuery += space + '<=' + space + q + value + q;
      }
      else if (typeof value === 'object') {
        subqueryFlagStatus = true;
        let str = value.toString().split(';')
        whereQuery += space + '<=' + space + `(${str.join('')})`;
      }
      else {
        q = '\'';
        whereQuery += space + '<=' + space + q + value + q;
      }
      return obj;
    },
    between: (from, to) => {
      let q_from = '';
      let q_to = '';
      if (typeof from === 'string') {
        q_from = '\'';
      }
      if (typeof to === 'string') {
        q_to = '\'';
      }
      if (notFlagStatus) {
        let str = whereQuery.split(space);
        let temp = str[str.length - 2];
        str[str.length - 2] = str[str.length - 1]
        str[str.length - 1] = temp;
        whereQuery = str.join(space)
      }
      whereQuery += space + 'BETWEEN' + space + q_from + from + q_from + space + 'AND' + space + q_to + to + q_to;
      return obj;
    },
    isNull: () => {
      if (notFlagStatus) {
        let str = whereQuery.split(space);
        let temp = str[str.length - 2];
        str[str.length - 2] = str[str.length - 1]
        str[str.length - 1] = 'IS';
        str.push(temp);
        whereQuery = str.join(space);
        whereQuery += space + 'NULL';
      }
      else {
        whereQuery += space + 'IS NULL';
      }
      return obj;
    },
    in: (values) => {
      if (values instanceof Array && values.length !== 0) {
        let arrStr = '';
        let q = '';
        for (let i = 0; i < values.length; i++) {
          if (typeof values[i] === 'string') {
            q = '\'';
          }
          else {
            q = '';
          }
          if (i !== values.length - 1) {
            arrStr += q + values[i] + q + `,${space}`;
          }
          else {
            arrStr += q + values[i] + q;
          }
        }
        if (notFlagStatus) {
          let str = whereQuery.split(space);
          let temp = str[str.length - 2];
          str[str.length - 2] = str[str.length - 1];
          str[str.length - 1] = temp;
          whereQuery = str.join(space);
        }
        whereQuery += space + 'IN' + space + `(${arrStr})`
      }
      else if (typeof values === 'object') {
        subqueryFlagStatus = true;
        let str = values.toString().split(';')
        whereQuery += space + 'IN' + space + `(${str.join('')})`;
      }
      else {
        return new Error('error: values should be an array');
      }
      return obj;
    },
    not: () => {
      if (!notFlagStatus) {
        let arr = whereQuery.split(`${space}`);
        let lastEl = arr.pop();
        arr.push('NOT');
        arr.push(lastEl);
        whereQuery = arr.join(`${space}`);
        notFlagStatus = true;
        return methodsForCondition;
      }
      else {
        throw 'error: could not place \'not\' after \'not\'';
      }
    }
  }

  let obj = {
    select: (...args) => {
      let arr = [...args];
      if (!selectFlagStatus) {
        if (arr.length !== 0) {
          for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'string') {
              if (i !== arr.length - 1) {
                selectQuery += quotes + arr[i] + quotes + ', ';
              }
              else {
                selectQuery += quotes + arr[i] + quotes;
              }
            }
            else {
              return new Error('arg not string');
            }
          }
          selectFlagStatus = true;
          return obj;
        }
        else {
          selectQuery += quotes + '*' + quotes;
          selectFlagStatus = true;
          return obj;
        }
      }
      else {
        return new Error('two select methods');
      }
    },

    from: (tableNamePar) => {
      let fromTableName = null;
      if (typeof tableName === 'string' && tableName.length !== 0) {
        fromTableName = tableName;
      }
      else if (typeof tableNamePar === 'string' && tableNamePar.length !== 0) {
        fromTableName = tableNamePar;
      }
      else {
        return new Error('not string parameter or empty string');
      }
      if (!fromFlagStatus) {
        fromQuery += quotes + fromTableName + quotes;
      }
      else {
        return obj;
      }
      fromFlagStatus = true;
      return obj;
    },

    where: (fieldName) => {
      if (selectFlagStatus && fromFlagStatus) {
        if (typeof fieldName === 'string' && fieldName.length !== 0) {
          if (!whereFlagStatus && !orwhereFlagStatus) {
            whereQuery += fieldName;
          }
          else if ((whereFlagStatus && !orwhereFlagStatus) || (!whereFlagStatus && orwhereFlagStatus)) {
            whereQuery += space + 'AND' + space + fieldName;
          }
          else if (whereFlagStatus && orwhereFlagStatus) {
            whereQuery += space + 'AND' + space + fieldName;
          }
          notFlagStatus = false;
          whereFlagStatus = true;
        }
        else {
          return new Error('not string or empty fieldName ')
        }
      }
      return methodsForCondition;
    },

    orWhere: (fieldName) => {
      if (selectFlagStatus && fromFlagStatus) {
        if (typeof fieldName === 'string' && fieldName.length !== 0) {
          if (!whereFlagStatus && !orwhereFlagStatus) {
            whereQuery += fieldName;
          }
          else if (orwhereFlagStatus || whereFlagStatus) {
            whereQuery += space + 'OR' + space + fieldName;
          }
          notFlagStatus = false;
          orwhereFlagStatus = true;
        }
        else {
          return new Error('not string or empty fieldName');
        }
      }
      return methodsForCondition;
    },

    toString: () => {
      if (selectFlagStatus) {
        resultToString = selectQuery;
      }
      if (!fromFlagStatus && typeof tableName === 'string' && tableName.length !== 0) {
        resultToString += fromQuery + quotes + tableName + quotes;
      }
      else if (fromFlagStatus) {
        resultToString += fromQuery;
      }
      else {
        return new Error('empty tableName');
      }
      if (whereFlagStatus || orwhereFlagStatus) {
        resultToString += whereQuery;
      }
      return `${resultToString};`;
    }
  };

  selectFlagStatus = false;
  fromFlagStatus = false;
  whereFlagStatus = false;
  orwhereFlagStatus = false;
  notFlagStatus = false;
  selectQuery = `${SELECT_DEFAULT}${space}`;
  fromQuery = ` ${FROM_DEFAULT}${space}`;
  whereQuery = `${space}${WHERE_DEFAULT}${space}`;
  return obj;
}
