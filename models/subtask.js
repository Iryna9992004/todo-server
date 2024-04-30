const {Schema,model}=require('mongoose');

const Subtask=new Schema({
    user:{type:String, required:true},
    text:{type:String, required:true},
    date:{type:Date, required:true}
})

module.exports=model('Subtask', Subtask);