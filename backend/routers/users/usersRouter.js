const express= require("express");
const userController = require("../../controllers/users/userController");
const usersRouter = express.Router();

//registration 
usersRouter.post("/api/v1/users/register",userController.register);
usersRouter.post("/api/v1/users/login",userController.login);

module.exports=usersRouter;