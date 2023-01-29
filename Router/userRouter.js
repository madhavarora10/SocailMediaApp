const express= require('express');
const authController= require('../Controllers/authController');
const userController=require('../Controllers/userController');


const Router=express.Router();

//CREATING A USER ACCOUNT 
Router.post('/signup',authController.signup);
//LOGGING IN USER
Router.post('/login',authController.login);
//RETRIEVE A SPECIFIC USER USING ID
Router.get('/:id',userController.getUser,);

//FOLLOW A SPECIFIC USER 
Router.put('/:id/follows',userController.getfollow,);

//UNFOLLOW A SPECIFIC USER
Router.put('/:id/unfollows',userController.getunfollow,);

//LOGGING OUT A USER
Router.get('/logout',authController.logout);

//retrive a list of users a specific user is following
Router.get('/:id/following',userController.getfollowing);
//retrive a list of users which  are following a specific users 
Router.get('/:id/followers ',userController.getfollowing);


module.exports=Router;