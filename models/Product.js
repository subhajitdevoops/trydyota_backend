const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    HsnSacNumber: {
      type: Number,
      required: false,
    },
    askForPrice: {
      type: Boolean,
      required: false,
    },
    fewLeft: {
      type: Boolean,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
      default:null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    image: [{
      medialink: {
        type: String,
        required: true
      },
      defaultOrNot: {
        type: Boolean,
        required: true
      }
    }],
    stock: {
      type: Number,
      required: false,
    },
    tax: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tax",
      required: false,
    }],
    warrantyPeriods: {
        duration: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          enum: ['months', 'years', 'days'],
          required: true,
         },
    },
    minimumOrderOfQuantity: {
      type: Number,
      required: true,
    },
    moqSlab: [{
      name: String,
      minQuantity:Number,
      maxQuantity:Number,
      moqSalePrice:Number,
      typeOfDiscount:{
        type:String,
        default:"Quantity wise"
      },
    }],
    sales: {
      type: Number,
      required: false,
    },
    tag: [String],
    prices: {
      price: {
        type: Number,
        required: false,
      },
      salePrice: {
        type: Number,
        required: false,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
    userManual: [
      {
        medialink: {
          type: String,
          required: false,
        },
      },
    ],
    technicalSpecification: [
      {
        medialink: {
          type: String,
          required: false,
        },
      },
    ],
    dataSheet: {
          type: String,
          required: false,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
