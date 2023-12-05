const express = require('express');
const router = express.Router();
const {
   getAskForPrice,
   askForPrice,
   action
} = require('../controller/askForPriceController.js');

const {loginornot} = require("../helper/login.js");


router.get('/',loginornot, getAskForPrice);

router.post('/',loginornot, askForPrice);

router.post('/action',loginornot, action);






module.exports = router;
