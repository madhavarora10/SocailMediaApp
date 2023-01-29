const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const validator= require('validator');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name']
    },
    email:{
        type:String,
        required:[true,'provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'email please']

    },
    photo: String,
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    password:{
        type:String,
        required:[true,'password provide '],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm password'],
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message:'password not confirmed'
        }
    }
      
});


userSchema.pre('save', async function(next){
     //hash the password with cost of 12
    this.password= await bcrypt.hash(this.password,12);
    //does not save confirm password in database
    this.passwordConfirm=undefined;
});

userSchema.methods.correctPassword= async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.pre(/^find/,function(next){
    this.find({active: { $ne:false }});
    next();

});


const User=mongoose.model('User',userSchema);

module.exports = User;