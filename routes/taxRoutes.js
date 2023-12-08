const express = require('express');
const router = express.Router();
const {
  getTax,
  addTax,
  getTaxById,
  deleteTax,
  taxaccordingstate
} = require('../controller/taxController');

const {checkLogin,loginornot} = require("../helper/login");


router.get('/',checkLogin, getTax);

router.post('/',checkLogin, addTax);

router.get('/taxbyid',checkLogin, getTaxById);

router.post('/deletetax',checkLogin, deleteTax);

router.post('/taxaccordingstate',loginornot, taxaccordingstate);



module.exports = router;
