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
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
      type: Number,
      required: true,
    }],
    warrantyPeriods: {
      type: {
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
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: false,
    },
    tag: [String],
    prices: {
      originalPrice: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      default: "activate",
      enum: ["activate", "deactivate"],
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
    testCertification: [
      {
        medialink: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
