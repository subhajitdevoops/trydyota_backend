const express = require('express');
const router = express.Router();
const {
    getenquiry,
    enquiry,
    action
} = require('../controller/enquiryController.js');

const {checkLogin} = require("../helper/login.js");


router.get('/',checkLogin, getenquiry);

router.post('/',checkLogin, enquiry);

router.post('/action',checkLogin, action);




module.exports = router;
