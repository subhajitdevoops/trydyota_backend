const express = require('express');
const router = express.Router();
const {
   getAskForPrice,
   askForPrice,
   action
} = require('../controller/askForPriceController.js');

const {checkLogin} = require("../helper/login.js");


router.get('/',checkLogin, getAskForPrice);

router.post('/',checkLogin, askForPrice);

router.post('/action',checkLogin, action);






module.exports = router;
