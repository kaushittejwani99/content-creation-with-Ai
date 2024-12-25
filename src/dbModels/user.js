const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:["content-writer","blog-Writter"]

    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})
module.exports=mongoose.model("user",userSchema);