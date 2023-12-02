const { string } = require("joi");
const mongoose = require("mongoose");

const askForPriceSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    personalDetails:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: false,
        },
        emailAddress:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: Number,
            required: true,
        }
    },
    shippingDetails:{
        streetAddress:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        zipCode:{
            type: Number,
            required: true,
        }
    },
    message:{
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const askForPrice = mongoose.model("askForPrice", askForPriceSchema);
module.exports = askForPrice;
