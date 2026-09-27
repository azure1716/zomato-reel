const foodPartnerModel = require("../models/foodpartner.model")
const userModel= require("../models/user.model")
const jwt=require("jsonwebtoken")

const authFoodPartnerMiddleware=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded=jwt.verify(token,process.env.jwt_secret)
        const foodPartner=await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({ message: "Unauthorized: Not a food partner" });
        }

        req.foodPartner=foodPartner
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }

}

const authUserMiddleware=async (req,res,next)=>{

    const token =req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.jwt_secret)
        
        const user=await userModel.findById(decoded.id)
        

        req.user=user
        next()

    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }

}


module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}