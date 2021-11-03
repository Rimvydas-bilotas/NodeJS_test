/* eslint-disable camelcase */
const express = require('express');
const accountsEntity = require('../database-entities/accounts');
const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handlePostAccount = async (req, res) => {
  try {
    let data;
    const userId = req.user.username;
    if (req.user) {
      const { groupId } = req.body;
      data = await accountsEntity.postAccount(groupId, userId);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetAccount = async (req, res) => {
  try {
    let data;
    const userId = req.user.username;
    if (req.user) {
      data = await accountsEntity.getAccounts(userId);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.post('/accounts', isAuthenticated, handlePostAccount);
router.get('/accounts', isAuthenticated, handleGetAccount);

module.exports = router;
