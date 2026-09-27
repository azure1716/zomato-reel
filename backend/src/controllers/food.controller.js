const foodModel = require("../models/food.model")
const storageService=require("../services/storage.service")
const {v4:uuid}=require("uuid")

async function createFood(req,res){ 
    console.log(req.body)
    console.log(req.file)

    if (!req.file) {
        return res.status(400).json({ message: "Video file is required" });
    }

    const fileUploadResult= await storageService.uploadFile(req.file.buffer,uuid())

    const foodItem= await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id

    })
    res.status(201).json({
        message:"food created successfully",
        food:foodItem
    })
   
}

async function getFoodItems(req,res){
    const foodItems= await foodModel.find({})
    res.status(200).json({
        message:"food items fetched successfully",
        foodItems
    })
}

module.exports={
    createFood,
    getFoodItems
}