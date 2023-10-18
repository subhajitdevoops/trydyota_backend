const Tax = require("../models/tax");



const getTax = async (req, res) => {
    try {
      const taxDetails = await Tax.find();
      res.status(200).send({
        success:true,
        message:"Sucessfully fetch!",
        taxDetails
      })
    } catch (err) {
        console.log(err),
        res.status(500).send({
         message: err.message,
        });
    }
};

const getTaxById = async (req, res) => {
    try {
      const data=req.body;
      const taxDetails = await Tax.findOne({_id:data.id});
      if(taxDetails!=null){
        res.status(200).send({
        success:true,
        message:"Sucessfully fetch!",
        taxDetails
        })
      }
      else{
        res.send({
          status:false,
          message:"please sent a valid tax id.",
        })

      }
    } catch (err) {
        console.log(err),
        res.status(500).send({
         message: err.message,
        });
    }
};

const addTax = async (req, res) => {
    try {
        const data=req.body;
        if(data.id){
           var result= await Tax.updateOne({ _id:data.id},{...data}).exec();
            callback({
               success: true, 
               message: "Sucessfully Updated!!!", 
               result
             });
        }
        else{
            if(data.id==''){
            delete data.id};
            const tax = new Tax({...data });
            var result=tax.save()
            res.send({
                 success: true, 
                 message: "Tax Added!!", 
             });   
        }
    } catch (err) {
      console.log(err);
      res.send({
        sucess:false,
        message: err.message,
      });
    }
};

const deleteTax = async (req, res) => {
  try {
      const data=req.body;
     
        var result= await Tax.deleteOne({_id:data.id}).exec();
        res.send({
             status:200,
             success: true, 
             message: "Sucessfully Deleted!!!", 
           });
      
      
  } catch (err) {
    console.log(err);
    res.send({
      sucess:false,
      message: err.message,
    });
  }
};



module.exports = {
    getTax,
    addTax,
    getTaxById,
    deleteTax
};