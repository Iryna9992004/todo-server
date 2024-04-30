const Task=require('../models/task')
const Subtask=require('../models/subtask')

class TaskController{
   async addTask(req,res){
      try{
         const {user,text,subtasks,date}=req.body;
         const task=await Task.create({user,text,subtasks,date});
         return res.status(200).json({task})
      }
      catch(e){
        console.log(e);
      }
   }

   async deleteTask(req,res){
    try{
      const {_id}=req.body;
      const task=await Task.findByIdAndDelete({_id});
      return res.status(200).json({task});
    }
    catch(e){
      console.log(e);
    }
   }

   async editTask(req,res){
      try{
        const {_id,newText,newDate}=req.body;
        const task=await Task.findByIdAndUpdate(_id,{text:newText,date:newDate});
        return res.status(200).json({task});
      }
      catch(e){
       console.log(e);
      }
   }

   async getElement(req,res){
      try{
        const {_id}=req.body;
        const task=await Task.findById({_id});
        return res.status(200).json({task});
      }
      catch(e){
         console.log(e);
      }
   }

   async markAsImportant(req,res){
     try{
       const {_id,important}=req.body;
       const task=await Task.findByIdAndUpdate(_id,{important});
       return res.status(200).json({task});
     }
     catch(e){
      console.log(e);
     }
   }

   async addSubTask(req,res){
      try{
       const {user,text,date}=req.body;
       const subtask=await Subtask.create({user,text,date});
       return res.status(200).json({subtask});
      }
      catch(e){
         console.log(e);
      }
   }
   
   async taskList(req,res){
      try{
         const {login}=req.body;
       const tasks=await Task.find({user:login});
       return res.status(200).json({tasks});
      }
      catch(e){
         console.log(e);
      }
   }

   async subtaskList(req,res){
      try{
        const {login}=req.body;
        const subtasks=await Subtask.find({user:login});
        return res.status(200).json({subtasks})
      }
      catch(e){
         console.log(e);
      }
   }
   
}

module.exports=new TaskController();