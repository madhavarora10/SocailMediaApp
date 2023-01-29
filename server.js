const mongoose=require('mongoose');
const app=require('./app');
const port=3000;

dotenv=require('dotenv')


dotenv.config({path: './config.env'});
const DB= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.set("strictQuery", false);
mongoose
.connect(DB,{
})
.then(()=>console.log('Db connected'));


const server=app.listen(port,()=>{
    console.log('app running')
});