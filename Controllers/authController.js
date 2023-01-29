const User = require("../Modals/userModal");
const catchAsync = require("../utils/catchAsync");
const jwt=require('jsonwebtoken');

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
       });
}

// CREATING A JWT TOKEN  FOR LOGING/LOGING OUT FUNCTIONALITY
const createSendToken=(user,statusCode,res)=>{
  const token=signToken(user._id);
  const cookieOptions={
    expires:new Date(
      Date.now()+process.env.JWT_COOKIE_EXPIRES_IN *24 *60 *60*1000
    ),
    httpOnly:true
  
  };
  if(process.env.NODE_ENV==='production') cookieOptions.secure=true;
  res.cookie('jwt',token,cookieOptions);


// Remove password from the Output
  user.password=undefined;



  res.status(statusCode).json({
    status:'success',
    token,
    data:{
      user
    }
  });

};

//SIGNING UP A USER 
  
exports.signup=catchAsync(async(req,res,next)=>{
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    });
    createSendToken(newUser,201,res);
});


//LOGGING A USER /////
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    //check if email and pass exist
    if(!email||!password){
        res.status(404).json('provide email and password ')
    }
    // check user exists and pass is correct
    const user=await User.findOne({email}).select('+password');

    if(!user||!(await user.correctPassword(password,user.password))){
       res.status(404).json('user not found')
    }
    res.status(200).json(user);
});


exports.logout = (req, res) => {
    res.cookie('jwt', 'test', {
      expires: new Date(Date.now()),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };