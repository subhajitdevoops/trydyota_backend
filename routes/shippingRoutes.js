const express = require('express');
const router = express.Router();
const {
  getShippingMethod,
  getShippingMethodById,
  addShippingMethod,
  deleteShippingMethod
} = require('../controller/shippingController.js');

const {isAdmin,checkLogin} = require("../helper/login");


router.get('/',checkLogin,isAdmin, getShippingMethod);

router.post('/',checkLogin,isAdmin, addShippingMethod);

router.get('/shippingmethodbyid',checkLogin,isAdmin, getShippingMethodById);

router.post('/deleteshippingmethod',checkLogin,isAdmin, deleteShippingMethod);




module.exports = router;
