const Tax = require("../models/tax");



const getTax = async (req, res) => {
    try {

            var data=req.query;

            var prevPage;                                        
            var nextPage;
            var hasPrevPage;
            var hasNextPage;

            var limit = data.limit ? Number(data.limit) : 10;
            var page = data.page ? Number(data.page) : 1;

            const taxDetails =await Tax.find().skip((page-1)*limit).limit(Number(limit)).exec();
            
            console.log(taxDetails);
            var countdata=await Tax.find().exec();

            var count=countdata.length;

            var totallength=Math.ceil(count/limit);

            if(totallength==1 && page==totallength ){
                prevPage=null;
                hasPrevPage=false;
                nextPage=null;
                hasNextPage=false;
                
            }
            else if(page==1 && totallength>page) {
                        prevPage=null;
                        hasPrevPage=false;``
                        nextPage=Number(page)+1; 
                        hasNextPage=true;
                        
            }
            else if(page>1 && page==totallength){
                    prevPage=Number(page)-1;
                    hasPrevPage=true;
                    nextPage=null;
                    hasNextPage=false;
                    
            }
            else{
                    prevPage=Number(page)-1;
                    nextPage=Number(page)+1;
                    hasPrevPage=true;
                    hasNextPage=true;
                    
            }

            const  Pagination ={
              "TotalDocuments":count,
              "limit":limit,
              "TotalPages":totallength,
              "Current Page":page,
              "PrevPage":prevPage,
              "NextPage":nextPage,
              "HasPrevPage":hasPrevPage,
              "HasNextPage":hasNextPage,
              "PagingCounter":page,        // consider index starting from 1,so pagingcounter will be same like index number //
              
              }

      
      res.status(200).send({
        success:true,
        message:"Sucessfully fetch!",
        taxDetails,
        Pagination
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
      const data=req.query;
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
            res.send({
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
        console.log(result);
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

const taxaccordingstate = async (req, res) => {
  try {
    const payload = req.body;

    const processedPayload = payload.map(item => {
      let taxes = item.tax.map(tax => {
        if (item.state.toLowerCase() === 'westbengal' && tax.taxName.toLowerCase().includes('gst')) {
          // If state is West Bengal and tax name contains 'gst', divide tax into sgst and cgst
          const sgstAmount = tax.amount / 2;
          const cgstAmount = tax.amount / 2;
          return [
            { type: 'percentage', taxName: 'SGST', amount: sgstAmount },
            { type: 'percentage', taxName: 'CGST', amount: cgstAmount }
          ];
        } else if (item.state.toLowerCase() !== 'westbengal' && tax.taxName.toLowerCase().includes('gst')) {
          // If state is not West Bengal and tax name contains 'gst', change tax name to igst
          return [{ type: 'percentage', taxName: 'IGST', amount: tax.amount }];
        } else {
          // If state is not West Bengal and tax name does not contain 'gst', keep it as it is
          return [{ ...tax }];
        }
      });

      // Flatten the taxes array and filter out null values
      taxes = taxes.flat().filter(tax => tax !== null);

      return { ...item, tax: taxes };
    });


    
    const processedPayload1 = processedPayload.map(item => {
      let taxes = item.tax.map(tax => {
        let taxAmount = (item.price * tax.amount) / 100;
        return {
          type: 'percentage',
          taxName: tax.taxName,
          amount: tax.amount,
          taxAmount: taxAmount
        };
      });

      const totalTaxAmount = taxes.reduce((acc, tax) => acc + tax.taxAmount, 0);
      const totalPrice = item.price + totalTaxAmount;

      return { ...item, tax: taxes, totalTaxAmount: totalTaxAmount, totalPrice: totalPrice };
    });

    res.send({
      success: true,
      message: 'Tax calculation successful',
      result: processedPayload1,
    });




  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
};


 

  





module.exports = {
    getTax,
    addTax,
    getTaxById,
    deleteTax,
    taxaccordingstate
};