const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/categories/categoryController");

const categoriesRouter = express.Router();

//-----Create category----

categoriesRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryController.createCategory
);

//----lists all categories----
categoriesRouter.get("/api/v1/categories", categoryController.fetchAllCategories);

//----update category----
categoriesRouter.put(
  "/api/v1/categories/:categoryId",
  isAuthenticated,
  categoryController.update
);

//--- get category---
categoriesRouter.get("/api/v1/categories/:categoryId", categoryController.getCategory);

//---delete category---
categoriesRouter.delete(
  "/api/v1/categories/:categoryId",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoriesRouter;