const askForPriceSchema = require("../models/askForPrice");
const Product = require("../models/Product");


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

// const getAskForPrice = async (req, res) => {
//     try {
//       const getAskForPriceDetails = await askForPriceSchema.find().exec();
//       res.status(200).send({
//         success:true,
//         getAskForPriceDetails,
//         message: "Successfully fetch!!",
//       });
//     } catch (err) {
//         console.log(err);
//       res.status(500).send({
//         success:false,
//         message: `Error occur when adding attribute ${err.message}`,
//       });
//     }
// };

const getAskForPrice = async (req, res) => {
  try {
   
    const {
      day,
      status,
      page,
      limit,
      method,
      endDate,
      // download,
      // sellFrom,
      startDate,
      customerName,
    } = req.query;
  
    //  day count
    let date = new Date();
    const today = date.toString();
    date.setDate(date.getDate() - Number(day));
    const dateTime = date.toString();
  
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    // const before_today = beforeToday.toString();
  
    const startDateData = new Date(startDate);
    startDateData.setDate(startDateData.getDate());
    const start_date = startDateData.toString();
  
    // console.log(" start_date", start_date, endDate);
  
    const queryObject = {};
  
    if (!status) {
      queryObject.$or = [
        { status: { $regex: `Pending`, $options: "i" } },
        { status: { $regex: `Processing`, $options: "i" } },
        { status: { $regex: `Delivered`, $options: "i" } },
        { status: { $regex: `Cancel`, $options: "i" } },
      ];
    }
  
    if (customerName) {
      queryObject.$or =[ 
       { "personalDetails.firstName": { $regex: `${customerName}`, $options: "i" }} ];
    }
  
    if (day) {
      queryObject.createdAt = { $gte: dateTime, $lte: today };
    }
  
    if (status) {
      queryObject.status = { $regex: `${status}`, $options: "i" };
    }
  
    if (startDate && endDate) {
      queryObject.updatedAt = {
        $gt: start_date,
        $lt: endDate,
      };
    }
   

    const getAskForPriceDetails = await askForPriceSchema
      .find(queryObject)
      .populate({
        path: "productId",
        model: "Product", // Replace "Product" with the actual model name for your product schema
      })
      .exec();

       const allData = await askForPriceSchema.find(queryObject).exec();

    var count=allData.length;
    var totallength=Math.ceil(count/limit);

    if(totallength==1 && page==totallength ){
        prevPage=null;
        hasPrevPage=false;
        nextPage=null;
        hasNextPage=false; 
    }
    else if(page==1 && totallength>page) {
                prevPage=null;
                hasPrevPage=false;
                nextPage=Number(page)+1; 
                hasNextPage=true;
    }
    else if(page>1 && page==totallength){
            prevPage=Number(page)-1;
            hasPrevPage=true;
            nextPage=null;
            hasNextPage=false;
    }
    else{   prevPage=Number(page)-1;
            nextPage=Number(page)+1;
            hasPrevPage=true;
            hasNextPage=true;
    }

    const pagination = {
      TotalDocuments: count,
      limit,
      TotalPages: totallength,
      CurrentPage: page,
      PrevPage: prevPage,
      NextPage: nextPage,
      HasPrevPage: hasPrevPage,
      HasNextPage: hasNextPage,
      PagingCounter: page,
    };

    res.status(200).send({
      success: true,
      getAskForPriceDetails,
      pagination,
      message: "Successfully fetch!!",
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `Error occurred when fetching data: ${err.message}`,
    });
  }
};

const getAskForPriceById = async (req, res) => {
  try {
    const getAskForPriceDetails = await askForPriceSchema.findOne({_id:req.query.id}).exec();
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


module.exports={askForPrice,getAskForPrice,action,getAskForPriceById}