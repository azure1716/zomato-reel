const mongoose=require("mongoose")

const foodPartnerSchema=mongoose.Schema({
    business_name:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


const foodPartnerModel=mongoose.model("foodpartner",foodPartnerSchema)
module.exports=foodPartnerModel