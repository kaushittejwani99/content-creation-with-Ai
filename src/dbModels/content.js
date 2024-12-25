const mongoose=require('mongoose');
const contentSchema= new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  content:{
   topic:{
    type:String
   },
   keywords:{
    type:Array
   },
   language:{
    type:String
   },
   level:{
    type:String
   },
   content:{
    type:String
   }
  }
},{timestamps:true})


module.exports=mongoose.model("content",contentSchema);



