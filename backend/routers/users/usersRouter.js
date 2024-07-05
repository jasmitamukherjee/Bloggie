const express= require("express");
const userController = require("../../controllers/users/userController");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const usersRouter = express.Router();

//registration 
usersRouter.post("/api/v1/users/register",userController.register);
usersRouter.post("/api/v1/users/login",userController.login);
usersRouter.get("/api/v1/users/auth/google",userController.googleAuth);
usersRouter.get("/api/v1/users/auth/google/callback",userController.googleAuthCallback);
usersRouter.get("/api/v1/users/checkAuthenticated",userController.checkAuthenticated);
usersRouter.post("/api/v1/users/logout",userController.logout);
usersRouter.get("/api/v1/users/profile",isAuthenticated,userController.profile);

usersRouter.put("/api/v1/users/follow/:followId",isAuthenticated,userController.followUser);
usersRouter.put("/api/v1/users/unfollow/:unfollowId",isAuthenticated,userController.unFollowUser);
usersRouter.get("/api/v1/users/account-verification-email",isAuthenticated,userController.verifyEmailAccount);
usersRouter.get("/api/v1/users/verify-account/:verifyToken",isAuthenticated,userController.verifyEmailAcc);

module.exports=usersRouter;