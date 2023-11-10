const express = require('express');
const router = express.Router();
const {
  getTax,
  addTax,
  getTaxById,
  deleteTax
} = require('../controller/taxController');

const {isAdmin,checkLogin} = require("../helper/login");


router.get('/',checkLogin, getTax);

router.post('/',checkLogin, addTax);

router.get('/taxbyid',checkLogin, getTaxById);

router.post('/deletetax',checkLogin, deleteTax);




module.exports = router;
