const askForPriceSchema = require("../models/askForPrice");

const askForPrice = async (req, res) => {
  try {
    const newAttribute = new askForPriceSchema(req.body);
    await newAttribute.save();
    res.send({
      message: "Request Submited Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: `Error occur when adding attribute ${err.message}`,
    });
  }
};


const getAskForPrice = async (req, res) => {
    try {
      const getAskForPriceDetails = await askForPriceSchema.find().exec();
      res.status(200).send({
        getAskForPriceDetails,
        message: "Successfully fetch!!",
      });
    } catch (err) {
        console.log(err);
      res.status(500).send({
        message: `Error occur when adding attribute ${err.message}`,
      });
    }
  };


module.exports={askForPrice,getAskForPrice}