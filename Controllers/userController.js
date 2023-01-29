const { router } = require("../app");
const User = require("../Modals/userModal");
const catchAsync = require("../utils/catchAsync");





// GETTING A SINGLE USER
exports.getUser=catchAsync(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  res.status(200).json(user)
});
exports.getfollowing=catchAsync(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  res.status(200).json(user.following)
});


//FOLLOWING A USER //////
exports.getfollow=catchAsync(async(req,res,next)=>{
    if(req.body.userId!==req.params.id){
        const user=await User.findById(req.params.id);
        const currentUser=await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({$push:{following:req.params.id}});

            res.status(200).json('user has been followed');
        } else{
            res.status(403).json('you already follow this user')
        }

    }else{
        res.status(403).json('you cannot follown yourself')
    }
    next();
});


// UNFLOWING A USER ////////////
exports.getunfollow=catchAsync(async(req,res,next)=>{
    if(req.body.userId!==req.params.id){
        const user=await User.findById(req.params.id);
        const currentUser=await User.findById(req.body.userId)
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull:{followers:req.body.userId}});
            await currentUser.updateOne({$pull:{following:req.params.id}});

            res.status(200).json('user has been unfollowed');
        } else{
            res.status(403).json('you  unfollowed this user')
        }

    }else{
        res.status(403).json('you cannot unfollow yourself')
    }
    next();
});