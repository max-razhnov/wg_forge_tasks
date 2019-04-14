/* eslint-disable max-statements */
import test from 'tape-catch';

import query from '../exercises/query';

const QUERY_METHODS = ['select', 'from', 'where', 'orWhere', 'insert', 'values', 'delete', 'toString'].sort();
const WHERE_METHODS = ['equals', 'in', 'gt', 'gte', 'lt', 'lte', 'between', 'isNull', 'not'].sort();

test('query', t => {
  t.equal(typeof query, 'function');

  const q = query();

  t.equal(typeof q, 'object');

  const methods = Object.keys(q);

  t.deepEqual(methods.sort(), QUERY_METHODS, '`query` has proper methods');
  for (const method of methods) {
    t.equal(typeof q[method], 'function', `where.${method} is a function`);
  }

  const whereStmt = q.where('id');

  t.deepEqual(Object.keys(whereStmt).sort(), WHERE_METHODS, '`where` has proper methods');
  for (const whereMethod of WHERE_METHODS) {
    t.equal(typeof whereStmt[whereMethod], 'function', `where.${whereMethod} is a function`);
  }

  t.test('generated SQL', qt => {
    const select = q.select().from('user');

    qt.equal(select.toString(), 'SELECT * FROM user;');
    qt.equal(select.from('ignore_this').toString(), 'SELECT * FROM user;');
    qt.equal(
      select
        .where('id')
        .in([42, 1337])
        .toString(),
      'SELECT * FROM user WHERE id IN (42, 1337);'
    );
    qt.equal(
      query()
        .select()
        .from('user')
        .where('name')
        .equals('Vasya')
        .where('id')
        .between(121, 12321)
        .toString(),
      `SELECT * FROM user WHERE name = 'Vasya' AND id BETWEEN 121 AND 12321;`
    );

    qt.equal(
      query()
        .select()
        .from('user')
        .where('id')
        .lte(42)
        .orWhere('id')
        .gte('12321')
        .toString(),
      `SELECT * FROM user WHERE id <= 42 OR id >= '12321';`
    );

    qt.equal(
      query()
        .select()
        .from('user')
        .orWhere('id')
        .gt(42)
        .orWhere('id')
        .lt('i am a string')
        .toString(),
      `SELECT * FROM user WHERE id > 42 OR id < 'i am a string';`
    );

    qt.equal(
      query()
        .select()
        .from('user')
        .where('id')
        .not()
        .equals(42)
        .toString(),
      `SELECT * FROM user WHERE NOT id = 42;`
    );

    qt.equal(
      query()
        .select()
        .from('user')
        .where('id')
        .not()
        .isNull()
        .toString(),
      `SELECT * FROM user WHERE id IS NOT NULL;`
    );

    qt.equal(
      query()
        .select()
        .from('user')
        .where('id')
        .not()
        .in([1, '3', 5, '7'])
        .toString(),
      `SELECT * FROM user WHERE id NOT IN (1, '3', 5, '7');`
    );

    qt.end();
  });

  t.test('handle errors', et => {
    t.throws(() => {
      query().not();
    }, "not() can't be called before where");

    t.throws(() => {
      query()
        .where()
        .not()
        .not();
    }, "not() can't be called multiple times in a row");
    et.end();
  });

  t.test('additional generated sql', qt => {
    qt.equal(query().insert('users').toString(), 'INSERT INTO users;');
    qt.equal(query().insert('id', [1, 2, '3']).toString(), `INSERT INTO id (1, 2, '3');`);
    qt.equal(query().insert('id').values([1, 2, 'max']).toString(), `INSERT INTO id VALUES (1, 2, 'max');`);
    qt.equal(query().delete('users').where('obj').not().equals(50).toString(), 'DELETE FROM users WHERE NOT obj = 50;');
    qt.equal(query().delete('posts').where('id').gt(10).toString(), 'DELETE FROM posts WHERE id > 10;');
    qt.throws(() => {
      query().delete();
    }, 'delete can\'t have empty fieldName');
    qt.throws(() => {
      query().values();
    }, `values can't be called before delete`);
    qt.end();
  });

  t.test('return new objects', tt => {
    const q1 = query();
    const q2 = query();

    tt.false(Object.is(q1, q2));

    q1.select()
      .from('user')
      .where('id')
      .equals(42);
    q2.select('hex')
      .from('colors')
      .where('webname')
      .not()
      .equals('red');

    tt.equal('' + q1, 'SELECT * FROM user WHERE id = 42;');
    tt.equal(`${q2}`, "SELECT hex FROM colors WHERE NOT webname = 'red';");

    tt.end();
  });

  t.test('sql escaping', { skip: true }, tt => {
    const escapedQ1 = query('table', { escapeNames: true });
    const escapedQ2 = query({ escapeNames: true });

    tt.false(Object.is(escapedQ1, escapedQ2));

    escapedQ1.select('id', 'name');
    escapedQ2.select('hex', 'hsla').from('colors');

    tt.equal(`${escapedQ1}`, 'SELECT "id", "name" FROM "table";');
    tt.equal(`${escapedQ2}`, 'SELECT "hex", "hsla" FROM "colors";');

    const unescapedQ = query({ escapeNames: false })
      .select('field')
      .from('table');
    tt.equal(unescapedQ.toString(), 'SELECT field FROM table;');

    tt.end();
  });

  t.end();
});
