const contactSchema = require("../models/Contact.js");


const contact = async (req, res) => {
    try {
      console.log(req.body);
      const contactSchemaData = new contactSchema(req.body);
      await contactSchemaData.save();
      res.status(200).send({
        success: true,
        message: "Message Successfully sent!!!"
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
};

const getContact = async (req, res) => {
    try {
      const contactForm = await contactSchema.find();
      res.status(200).send({
        success: true,
        message: "Message Successfully fetch!!!",
        contactForm
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    }
};


module.exports ={contact,getContact}