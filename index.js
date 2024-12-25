const express=require('express');
const app=express();
const user=require("./src/routes/userRoutes");
const openAi=require("./src/routes/openAiRoutes");
app.use(express.json());
app.use("/",user);
app.use("/openai",openAi)
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/content-creation").then(()=>{console.log("successfully connected mongodb")}).catch((error)=>{ console.error("MongoDB connection error:", error)})
app.listen(3000,()=>{
    console.log("app listen succesfully on port 3000")
})