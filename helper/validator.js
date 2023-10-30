const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Tax = require('../models/tax');
const { ObjectId } = require('mongoose').Types;


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



const categoriesAndTaxExistOrNot = async (req, res, next) => {
  try {
    const payload = req.body; // Assuming req.body is the array of JSON objects
    console.log(payload);
    for (const product of payload) {
      if (product.categories && product.categories.length > 0) {
        const categoryNames = product.categories;
        const categoryIds = await Category.find({ name: { $in: categoryNames } }, '_id');
        product.categories = categoryIds.map(category => category._id);
      } else {
        product.categories = null;
      }

      if (product.category) {
        const categoryName = product.category;
        const category = await Category.findOne({ name: categoryName }, '_id');
        product.category = category ? category._id : null;
      } else {
        product.category = null;
      }

      if (product.tax && product.tax.length > 0) {
        const taxNames = product.tax;
        const taxIds = await Tax.find({ taxName: { $in: taxNames } }, '_id');
        product.tax = taxIds.map(tax => tax._id);
      } else {
        product.tax = null;
      }
    }

    // Continue to the next middleware or controller with the updated req.body
    next();
  } catch (error) {
    // Handle any errors, such as database connection issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







module.exports = {validateCategoriesAndTax,categoriesAndTaxExistOrNot};