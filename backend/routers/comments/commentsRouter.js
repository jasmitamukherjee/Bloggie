const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const commentsController = require("../../controllers/comments/commentsController");
// const categoryController = require("../../controllers/categories/categoryController");

const commentRouter = express.Router();

//-----Create comment----

commentRouter.post("/api/v1/comments/create", isAuthenticated, commentsController.create);

module.exports = commentRouter;