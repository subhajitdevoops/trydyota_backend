const express = require('express');
const router = express.Router();
const {
  contact,
  getContact
} = require('../controller/contactController.js');

const {loginornot,isAdmin} = require("../helper/login.js");

//add a contact
router.post('/',contact);

//get all contact
router.get('/',isAdmin,getContact);





module.exports = router;