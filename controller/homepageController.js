const Homepage = require("../models/homepage.js");



const getHomePage = async (req, res) => {
    try {

            var data=req.query;

            var prevPage;                                        
            var nextPage;
            var hasPrevPage;
            var hasNextPage;

            var limit = data.limit ? Number(data.limit) : 10;
            var page = data.page ? Number(data.page) : 1;

            const HomepageDetails =await Homepage.find().skip((page-1)*limit).limit(Number(limit)).exec();
            

            var countdata=await Homepage.find().exec();

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
        HomepageDetails,
        Pagination
      })
    } catch (err) {
        console.log(err),
        res.status(500).send({
         message: err.message,
        });
    }
};

const addHomePage = async (req, res) => {
    try {
        const data=req.body;
        if(data.id){
            var result= await Homepage.updateOne({ _id:data.id},{...data}).exec();
            res.send({
               success: true, 
               message: "Sucessfully Updated!!!", 
               result
             });
        }
        else{
            if(data.id==''){
            delete data.id};
            const homepage = new Homepage({...data });
            var result=homepage.save()
            res.send({
                 success: true, 
                 message: "Homepage Banner Added!!", 
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

const deleteHomePage = async (req, res) => {
  try {
      const data=req.body;
      if(data.id){
          var result= await Homepage.deleteOne({ _id:data.id}).exec();
          res.send({
             success: true, 
             message: "Sucessfully deleted!!!", 
             result
           });
      }
      else{
          res.send({
               success: true, 
               message: "Please sent a valid id!!", 
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



module.exports = {
    getHomePage,
    addHomePage,
    deleteHomePage
};