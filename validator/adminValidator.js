const Joi = require('joi');
const config = require("../config/config.json");
const secretKey = config.googleAuth.secretKey;
const jwt = require("jwt-decode");
const bcryptjs = require("bcrypt");
const userschema = require('../schema/userschema');
var randomstring = require("randomstring");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const regdetailsverify=async (req,res,next)=>{
    try { 
            const schema = Joi.object({ 
                name:Joi.string().required(),
                email:Joi.string().email().required(),
                password: Joi.string().required(),
                role:Joi.string().required(),
            }) 
            const value = await schema.validateAsync(req.body);
            next() 
    } 
    catch (error) {
            
            return res.status(400).send({ 
                code: 3, 
                message: "Bad Request :Invalid Parameters", 
                payload: error }) 
    }
}

module.exports = {regdetailsverify};