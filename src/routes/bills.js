/* eslint-disable camelcase */
const express = require('express');
const billsEntity = require('../database-entities/bills');
const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handlePostBill = async (req, res) => {
  try {
    let data;
    if (req.user) {
      const { groupId, amount, description } = req.body;
      data = await billsEntity.postBill(groupId, amount, description);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetBills = async (req, res) => {
  try {
    let data;
    if (req.user) {
      const { groupId } = req.params;
      data = await billsEntity.getBills(groupId);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.post('/bills', isAuthenticated, handlePostBill);
router.get('/bills/:groupId', isAuthenticated, handleGetBills);

module.exports = router;
