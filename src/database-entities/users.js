/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbConfig, secretKey } = require('../config');

const registerUser = async (full_name, email, password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const con = await mysql.createConnection(dbConfig);
    const [validation] = await con.execute('SELECT COUNT(id) AS count FROM users2 WHERE email = ?', [email]);
    await con.end();
    if (validation[0].count === 0) {
      const conn = await mysql.createConnection(dbConfig);
      const [result] = await conn.execute('INSERT INTO users2 (full_name, email, password, reg_timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [full_name, email, hashedPassword]);
      await conn.end();
      return result;
    }
    // eslint-disable-next-line no-return-assign
    return data = 'Account with this email already exists';
  } catch (error) {
    return error;
  }
};

const loginUser = async (email, password) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM users2 WHERE email = ?', [email]);
    await con.end();
    const doesPasswordMatch = bcrypt.compareSync(password, result[0].password);
    if (!doesPasswordMatch) {
      return 'Could not authenticate the user. Password or email is incorrect.';
    }
    const token = jwt.sign(
      {
        username: result[0].id,
      },
      secretKey,
    );
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
