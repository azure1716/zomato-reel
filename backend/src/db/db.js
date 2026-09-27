const mongoose=require("mongoose")

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/zomato")
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log("database connection error", err)
    })
}

module.exports=connectDB

