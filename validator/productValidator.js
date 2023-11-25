const Joi = require('joi');

const productValidation=async (req,res,next)=>{
    try { 

        const productValidation = Joi.object({
            productId: Joi.string(),
            sku: Joi.string(),
            barcode: Joi.string().default(null),
            title: Joi.string().required(),
            description: Joi.string().required(),
            slug: Joi.string(),
            categories: Joi.array().items(Joi.string().required()),
            category: Joi.string().required(),
            image: Joi.array().items(
              Joi.object({
                medialink: Joi.string().required(),
                defaultOrNot: Joi.boolean().required(),
              })
            ).required(),
            stock: Joi.number(),
            tax: Joi.array().items(Joi.string().required()),
            warrantyPeriods: Joi.object({
              duration: Joi.number().required(),
              unit: Joi.string().valid('months', 'years', 'days').required(),
            }).required(),
            minimumOrderOfQuantity: Joi.number().required(),
            moqSlab: Joi.array().items(
              Joi.object({
                name: Joi.string(),
                minQuantity: Joi.number(),
                maxQuantity: Joi.number(),
                moqSalePrice: Joi.number(),
                typeOfDiscount: Joi.string().default('Quantity wise'),
              })
            ),
            sales: Joi.number(),
            tag: Joi.array().items(Joi.string()),
            prices: Joi.object({
              price: Joi.number().required(),
              salePrice: Joi.number().required(),
              discount: Joi.number().required(),
            }).required(),
            variants: Joi.array(),
            isCombination: Joi.boolean().required(),
            status: Joi.string().valid('show', 'hide').default('show'),
            userManual: Joi.array().items(
              Joi.object({
                medialink: Joi.string(),
              })
            ),
            technicalSpecification: Joi.array().items(
              Joi.object({
                medialink: Joi.string(),
              })
            ),
            testCertification: Joi.array().items(
              Joi.object({
                medialink: Joi.string(),
              })
            ),
          });
            const value = await productValidation.validateAsync(req.body);
            console.log("regdetailsverify");
            next() 
    } 
    catch (error) {
            
            return res.status(400).send({ 
                code: 3, 
                message: "Bad Request :Invalid Parameters", 
                payload: error }) 
    }
}






module.exports = productValidation;