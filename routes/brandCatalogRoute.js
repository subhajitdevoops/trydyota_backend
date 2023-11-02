const express = require('express');
const router = express.Router();
const {
  getBrandCatalog,
  addBrandCatalog,
  getBrandCatalogById,
  deleteBrandCatalogById
} = require('../controller/brandCatalogController.js');

const {isAdmin,checkLogin} = require("../helper/login.js");


router.get('/',checkLogin,isAdmin, getBrandCatalog);

router.post('/',checkLogin,isAdmin, addBrandCatalog);

router.get('/getBrandCatalogById',checkLogin,isAdmin, getBrandCatalogById);

router.delete('/deleteBrandCatalogById/:id',checkLogin,isAdmin, deleteBrandCatalogById);




module.exports = router;
