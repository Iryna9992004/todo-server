const User=require('../models/user')
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

const generateAccessToken=(id,login)=>{
   const payload={
    id,
    login
   }
   return jwt.sign(payload,process.env.ACCESS_SECRET,{expiresIn:'1h'})
}

class authController{
  async registration(req,res){
    try{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({massage:"Wrong login or password"});
      } 
      const {login,password}=req.body;
      const candidate=await User.findOne({login});
      if(candidate){
        return res.status(400).json({message:"User with this login already exist!"});
      }
      const hashedPassword=await bcrypt.hashSync(password,4)
      const user=await User.create({login,password:hashedPassword});

      const token=generateAccessToken(user.login, user.password);

      return res.status(200).json({token});
    }
    catch(e){
     console.log(e);
     res.status(400).json({message:"Error"});
    }
  }

  async login(req,res){
   try{
     const {login,password}=req.body;
     const candidate=await User.findOne({login});

     if(!candidate){
        return res.status(400).json({message:"User doesn`t exist"});
     }
     const validPassword=bcrypt.compare(password, candidate.password);
     if(!validPassword){
        return res.status(400).json({message:"Wrong password"})
     }
     const token=generateAccessToken(candidate._id, candidate.login);

     return res.status(200).json({token})
   }
   catch(e){
    console.log(e);
    res.status(400).json({message:"Error"});
   }
  }

  async getUsers(req,res){
    try{
      res.json({Hell:"jhjjl"})
    }
    catch(e){
     console.log(e);
    }
  }
}

module.exports=new authController();