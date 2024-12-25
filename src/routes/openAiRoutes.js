const router=require('express').Router();
const openAiControllers=require("../controllers/openAiCotroller");
router.post("/getContent",openAiControllers.getContent);
module.exports=router