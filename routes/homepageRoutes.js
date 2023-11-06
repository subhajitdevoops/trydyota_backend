const express = require('express');
const router = express.Router();
const {
  getHomePage,
  addHomePage,
  deleteHomePage
} = require('../controller/homepageController');

const {isAdmin,checkLogin} = require("../helper/login");


router.get('/',checkLogin,isAdmin, getHomePage);

router.post('/',checkLogin,isAdmin, addHomePage);

router.post('/deleteHomePage',checkLogin,isAdmin, deleteHomePage);




module.exports = router;
