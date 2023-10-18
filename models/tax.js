const mongoose = require("mongoose");

const tax = new mongoose.Schema(
  {
    taxName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "percentage",
      enum: [
        "percentage",
        "flatin",
      ],
    },
    ammount: {
        type: Number,
        currencySymbol:String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Tax = mongoose.model("Tax", tax);
module.exports = Tax;
