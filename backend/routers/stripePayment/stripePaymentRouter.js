const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
// const checkUserPlan = require("../../middlewares/checkUserPlan");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");
const checkUserPlan = require("../../middlewares/checkUserPlan");

const stripePaymentRouter = express.Router();

//-----Create payment----

stripePaymentRouter.post(
  "/api/v1/stripe/checkout",
  isAuthenticated,
  stripePaymentController.payment
);

// //----verify payment----
stripePaymentRouter.get("/api/v1/stripe/verify/:paymentId",stripePaymentController.verify);
stripePaymentRouter.get(
  "/api/v1/stripe/free-plan",
  isAuthenticated,
  stripePaymentController.free
);

module.exports = stripePaymentRouter;