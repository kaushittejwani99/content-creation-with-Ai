const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDona49MsBx97B0MPayeBhkeWL3k5iVO-c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

 
exports.generate=async(topic,keywords,language,level)=>{
   try{
  const result = await model.generateContent(`write a content about ${topic} using context of this ${keywords} in a ${language} and explain in a ${level} level `);
  return result.response.text()
   }catch(error){
    return error;
   }
}


