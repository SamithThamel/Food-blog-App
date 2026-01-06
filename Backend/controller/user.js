const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSignUp=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json({message:"Please provide all required fields"});
    }
    let existingUser=await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        email,
        password:hashedPassword
    });
    let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY);
    return res.status(200).json({token,user:newUser});
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({message:"Please provide all required fields"});
    }
    let user=await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY);
        return res.status(200).json({token,user});
    }
    else 
    {
        return res.status(400).json({message:"Invalid credentials"});
    }
}

const getUser=async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message:"Error fetching user"});
    }
}

module.exports={userSignUp,userLogin,getUser};