/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postAccount = async (groupId, userId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [check] = await con.execute('SELECT COUNT(group_id) AS count FROM accounts1 where user_id=? and group_id=?;', [userId, groupId]);
    await con.end();
    if (check[0].count === 0) {
      const conn = await mysql.createConnection(dbConfig);
      const [result] = await conn.execute('INSERT INTO accounts1 (group_id, user_id) VALUES (?, ?)', [groupId, userId]);
      await conn.end();
      return result;
    }
    // eslint-disable-next-line no-return-assign
    return data = { data: 'this group already exists in your account' };
  } catch (error) {
    return ({ error });
  }
};

const getAccounts = async (user_id) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT name, groups1.id FROM accounts1 inner join groups1 on accounts1.group_id=groups1.id where user_id=?;', [user_id]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  postAccount,
  getAccounts,
};
