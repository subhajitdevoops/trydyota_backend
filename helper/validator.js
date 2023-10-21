const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Tax = require('../models/tax');



// Middleware to validate categories and tax

const validateCategoriesAndTax = async (req, res, next) => {
  const productToValidate = req.body;

  // Validate tax IDs and remove invalid ones
  const validTaxIds = [];
  for (const taxId of productToValidate.tax) {
    const isValid = await Tax.exists({ _id: taxId });
    if (isValid) {
      validTaxIds.push(taxId);
    }
  }
  productToValidate.tax = validTaxIds;
  console.log("validTaxIds",validTaxIds);
  
  
  // Validate category IDs and remove invalid ones
  const validCategoryIds = [];
  for (const categoryId of productToValidate.categories) {
    const isValid = await Category.exists({ _id: categoryId });
    if (isValid) {
      validCategoryIds.push(categoryId);
    }
  }
  productToValidate.categories = validCategoryIds;
  console.log("validCategoryIds",validCategoryIds);


  // Check if any tax or category IDs are left
  if (productToValidate.tax.length > 0 && productToValidate.categories.length > 0) {
    // If both categories and tax are valid, proceed with the modified product
    req.body = productToValidate;
    next();
  } else {
    productToValidate.categories = null;
    productToValidate.tax = null;
    req.body = productToValidate;
    // Either categories or tax IDs are empty
    next();
    }
};





module.exports = validateCategoriesAndTax;