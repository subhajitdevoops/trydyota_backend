const express = require('express');
const router = express.Router();
const {
  getHomePageBanner,
  addHomePageBanner,
  deleteHomePageBanner,
  search,
  suggestions
} = require('../controller/homepageController');

const {isAdmin,checkLogin} = require("../helper/login");
const homepageValidation=require("../validator/homepageValidator")


router.get('/homepagebanner',getHomePageBanner);

router.post('/homepagebanner',checkLogin,isAdmin, homepageValidation,addHomePageBanner);

router.post('/deletehomepagebanner',checkLogin,isAdmin, deleteHomePageBanner);

router.get('/search', search);

router.get('/suggestion', suggestions);



module.exports = router;
