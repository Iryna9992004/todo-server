const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
   if(req.method==="OPTIONS"){
    next();
   }
   try{
     const token=req.headers.authorization.split(' ')[1];
     if(!token){
        return res.status(403).json({message:"Not authorized"});
     }
     const decodedData=jwt.verify(token, process.env.ACCESS_SECRET);
     req.user = decodedData;
      next();
     
    }
   catch(e){
    console.log(e);
    return res.status(403).json({message:"User is not authorized"});
   }
}