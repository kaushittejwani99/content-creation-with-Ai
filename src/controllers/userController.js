const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const joi=require("joi")
const user= require("../dbModels/user");
const openAi=require("../dbModels/content");
exports.register=async(req,res)=>{
  try{
    const userRegister=joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        role:joi.string().required(),
    });
    const {error}=userRegister.validate(req.body);
    if(error){
        console.log("Validation error:", error.details[0].message);
    }else{
        const {name,role,email,password}=req.body;
        const hashPassword=await bcrypt.hash(password,10);
        let userDetails={name:name,email:email,password:hashPassword,role:role};
        const token=jwt.sign(userDetails,"secretKey89",{expiresIn:'1h'});
        req.body.token=token;

        const newUser=await user.create(userDetails);
        res.status(201).json({success:true,newUser,token})
    }
     
  }catch(error){
    console.warn(error);
  }
}

exports.login=async(req,res)=>{
  try{
    const userlogin =joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
    })
     
   const {error}= userlogin.validate(req.body);
   const {email,password}=req.body
   if(error){
    res.status(400).json({success:true,error:error.details[0].message})
   }else{
    const User=await user.findOne({email:email});
    if(User){
      const checkPassword=bcrypt.compare(password,User.password);
      let userDetails={
        id:User._id
      }
      if(checkPassword){
        const token=jwt.sign(userDetails,"secretKey89",{expiresIn:"1h"});
        req.token=token;
        res.status(200).json({success:true,message:"user successfully login",user:User,token:req.token})
      }else{
        res.status(400).json({success:true,message:"password was wrong please try again "})
      }
        
    }else{
      res.status(400).json({success:false,message:"user not found "})

    }
   }

  }catch(error){
     res.status(400).json({success:false,error})
     console.error(error)
  }
}

exports.getAllBlogsOfUser=async(req,res)=>{
 try{
  const token=req.headers.authorization;
  if(!token){
    res.status(400).json({success:false,message:"token required !!!"})
  }
  const decodedToken=jwt.decode(token,"secretKey89");
  console.log(decodedToken);
  const allContent=await openAi.find({author:decodedToken.id})
  console.log(allContent)
  if(allContent){
    res.status(200).json({success:true,data:allContent})
  }else{
    res.status(200).json({success:true,message:"No cotent found"})
  }

 }catch(error){
  res.status(400).json({success:false,error});
  cosole.error(error);
 }
}