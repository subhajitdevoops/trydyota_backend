const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    subject: {
        type: String,
        required: false,
      },
    message: {
        type: String,
        required: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);


const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
