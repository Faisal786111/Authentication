const express = require("express");
const router =new express.Router();
const {registerController , loginController ,logoutController} = require("../controllers/user");


//method : POST
//Register API
router.post("/register" , registerController);

//method : POST 
//Login API 
router.post("/login" , loginController);

//method : POST 
//Logout API 
router.post("/logout" , logoutController);

module.exports = router;