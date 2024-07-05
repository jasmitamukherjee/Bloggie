const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const planController = require("../../controllers/plan/planController");
const planRouter = express.Router();

//-----Create plan----

planRouter.post("/api/v1/plans/create", isAuthenticated, planController.createPlan);

//----lists all plans----
planRouter.get("/api/v1/plans", planController.lists);

//----update plan----
planRouter.put("/api/v1/plans/:planId", isAuthenticated, planController.update);

//--- get plan---
planRouter.get("/api/v1/plans/:planId", planController.getPlan);

//---delete plan---
planRouter.delete("/api/v1/plans/:planId", isAuthenticated, planController.delete);

module.exports = planRouter;