const express = require("express");
const router = express.Router();

const {isAdmin} = require("../helper/login");

const {
    about,getAbout,
  } = require('../controller/aboutController.js');

router.post("/",isAdmin,about);

router.get("/",isAdmin,getAbout);


module.exports = router;
