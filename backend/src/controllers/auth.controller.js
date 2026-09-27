const userModel=require("../models/user.model")
const foodPartnerModel=require("../models/foodpartner.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

async function registerUser(req,res){
    const{fullName,email,password}=req.body

    const isUserAlreadyExists=await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({message:"user already exists"})
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        fullName,email,password:hashedPassword
    })

    const token=jwt.sign({id:user.id},process.env.jwt_secret)

    res.cookie("token",token)

    res.status(201).json({message:"user created successfully",
        user:{
        _id:user._id,
        email:user.email
    }})

}


async function  loginUser(req,res) {
    const{email,password}=req.body

    const user=await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message:"invalid eail or password"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
         return res.status(400).json({message:"invalid eail or password"})
    }
    const token=jwt.sign({id:user.id},process.env.jwt_secret)

    res.cookie("token",token)

    res.status(201).json({message:"user loggedin successfully",
        user:{
        _id:user._id,
        email:user.email
    }})
}


async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"user loggedout successfully"
    })
}



async function registerFoodPartner(req,res){
    const{name,email,password,business_name,address}=req.body

    const isAccountAlreadyExists= await foodPartnerModel.findOne({email})

    if(isAccountAlreadyExists){
        return res.status(400).json({message:"foodpartner already exists"})
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const foodPartner=await foodPartnerModel.create({
        name,email,password:hashedPassword,address,business_name
    })

    const token=jwt.sign({id:foodPartner.id},process.env.jwt_secret)

    res.cookie("token",token)

    res.status(201).json({message:"foodpartner created successfully",
        foodPartner:{
        _id:foodPartner._id,
        email:foodPartner.email
    }})
}


async function loginFoodPartner(req,res){
    const {email,password}=req.body

    const foodPartner=await foodPartnerModel.findOne({email})
    if(!foodPartner){
        return res.status(400).json({message:"invalid eail or password"})
    }
    const isPasswordValid=await bcrypt.compare(password,foodPartner.password)

    if(!isPasswordValid){
         return res.status(400).json({message:"invalid eail or password"})
    }
    const token=jwt.sign({id:foodPartner.id},process.env.jwt_secret)

    res.cookie("token",token)

    res.status(201).json({message:"foodpartner loggedin successfully",
        foodPartner:{
        _id:foodPartner._id,
        email:foodPartner.email
    }})
}

async function logoutFoodPartner(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"foodpartner loggedout successfully"
    })
}



module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}