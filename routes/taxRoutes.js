const express = require('express');
const router = express.Router();
const {
  getTax,
  addTax,
  getTaxById,
  deleteTax
} = require('../controller/taxController');

const {isAdmin,checkLogin} = require("../helper/login");


router.get('/',checkLogin,isAdmin, getTax);

router.post('/',checkLogin,isAdmin, addTax);

router.get('/taxbyid',checkLogin,isAdmin, getTaxById);

router.post('/deletetax',checkLogin,isAdmin, deleteTax);




module.exports = router;
