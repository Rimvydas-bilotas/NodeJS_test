/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postBill = async (groupId, amount, description) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('INSERT INTO bills1 (group_id, amount, description) VALUES (?, ?, ?)', [groupId, amount, description]);
    await con.end();
    return result;
  } catch (error) {
    return ({ error });
  }
};

const getBills = async (groupId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM bills1 inner join groups1 on bills1.group_id=groups1.id where groups1.id=?;', [groupId]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  postBill,
  getBills,
};
