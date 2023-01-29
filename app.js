const express=require('express');
const app=express();
const userRouter=require('./Router/userRouter')

//to parse express
app.use(express.json());

///Routes   middlewares//
app.use('/api/v1/users',userRouter);


//exporting app.js
module.exports=app;