/* eslint-disable camelcase */
const express = require('express');
const usersEntity = require('../database-entities/users');
// const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handleRegisterUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const data = await usersEntity.registerUser(full_name, email, password);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await usersEntity.loginUser(email, password);
    return res.send({ message: 'Succsessfully logged in', data });
  } catch (error) {
    return res.status(500).send(error);
  }
};

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);

module.exports = router;
