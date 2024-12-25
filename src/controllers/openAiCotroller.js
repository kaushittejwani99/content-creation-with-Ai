const jwt=require("jsonwebtoken");
const contentDb=require("../dbModels/content")
const openAi=require("../geminiai");
const joi=require('joi');

exports.getContent=async(req,res)=>{
    try{
        const contentKeywords=joi.object({
            topic:joi.string().required(),
            keywords:joi.array().required(),
            language:joi.string().required(),
            level:joi.string().required()
          
        })
    
        const {error}= contentKeywords.validate(req.body);
        if(error){
            res.status(400),json({success:true,error:error.details[0].message})
        }
        else{
            const{topic,keywords,language,level}=req.body;
            const content= await openAi.generate(topic,keywords,language,level);
            console.log(req.headers)

            const token=req.headers.authorization;
            const decodedToken=jwt.decode(token,"secretKey89")
            
            const saveContentInDB={
              author:decodedToken.id,
              "content.topic":topic,
              "content.keywords":keywords,
              "content.language":language,
              "content.level":level,
              "content.content":content
            }
    
            await contentDb.create(saveContentInDB);
            res.status(201).json({success:true,content})
        }
    }catch(error){
      console.log(error);
    }
    
}
