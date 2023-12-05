const askForPriceSchema = require("../models/askForPrice");

const askForPrice = async (req, res) => {
  try {
    const newAttribute = new askForPriceSchema(req.body);
    await newAttribute.save();
    res.status(200).send({
      success:true,
      message: "Request Submited Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success:false,
      message: `Error occur when adding attribute ${err.message}`,
    });
  }
};

const getAskForPrice = async (req, res) => {
    try {
      const getAskForPriceDetails = await askForPriceSchema.find().exec();
      res.status(200).send({
        success:true,
        getAskForPriceDetails,
        message: "Successfully fetch!!",
      });
    } catch (err) {
        console.log(err);
      res.status(500).send({
        success:false,
        message: `Error occur when adding attribute ${err.message}`,
      });
    }
};

const action = async (req, res) => {
    try {
      const askForPrice = await askForPriceSchema.updateOne({_id:req.body.id},{$set: {status: req.body.status}}).exec();
      res.status(200).send({
        success:true,
        message: "Successfully updated!!",
      });
    } catch (err) {
        console.log(err);
      res.status(500).send({
        success:false,
        message: `Error occur when adding attribute ${err.message}`,
      });
    }
};


module.exports={askForPrice,getAskForPrice,action}