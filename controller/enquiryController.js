const enquirySchema = require("../models/enquiry");

const enquiry = async (req, res) => {
  try {
    const enquiryDetails = new enquirySchema(req.body);
    await enquiryDetails.save();
    res.status(200).send({
      message: "enquiry Submited Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Error occur when adding attribute ${err.message}`,
    });
  }
};

const getenquiry = async (req, res) => {
    try {
      const enquiryDetails = await enquirySchema.find().exec();
      res.status(200).send({
        enquiryDetails,
        message: "Successfully fetch!!",
      });
    } catch (err) {
        console.log(err);
      res.status(500).send({
        message: `Error occur when adding attribute ${err.message}`,
      });
    }
};

const action = async (req, res) => {
  try {
    const enquiryDetails = await enquirySchema.updateOne({_id:req.body.id},{$set: {status: req.body.status}}).exec();
    res.status(200).send({
      message: "Successfully updated!!",
    });
  } catch (err) {
      console.log(err);
    res.status(500).send({
      message: `Error occur when adding attribute ${err.message}`,
    });
  }
};


module.exports={enquiry,getenquiry,action}