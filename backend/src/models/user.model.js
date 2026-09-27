const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
},{
    timrstamps:true
})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel