const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const router=require('./router/index')
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors({
  credentials:true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin:true
}));
app.use('/api',router);

const start=async ()=>{
    try{
      await mongoose.connect(process.env.URL)
      app.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))
    }
    catch(e){
        console.log(e);
    }
}

start();