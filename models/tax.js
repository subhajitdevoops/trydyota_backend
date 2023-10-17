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
      default: "Percentage",
      enum: [
        "Percentage",
        "flatin",
      ],
    },
    ammount: {
        type: Number,
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
