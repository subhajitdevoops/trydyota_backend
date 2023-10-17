const express = require('express');
const router = express.Router();
const {
  getTax,
  addTax,
  getTaxById,
  deleteTax
} = require('../controller/taxController');


router.get('/', getTax);

router.post('/', addTax);

router.get('/taxbyid', getTaxById);

router.post('/deletetax', deleteTax);




module.exports = router;
