const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const User = require("../../models/User/User");
const Payment = require("../../models/Payment/Payment");

const stripePaymentRouter = express.Router();

//-----Create payment----
stripePaymentRouter.post(
  "/api/v1/stripe/checkout",
  isAuthenticated,
  stripePaymentController.payment
);

// //----verify payment----
stripePaymentRouter.get("/api/v1/stripe/verify/:paymentId", stripePaymentController.verify);

//----Handle success redirect----
stripePaymentRouter.get("/success", asyncHandler(async (req, res) => {
  // Extract payment_intent and payment_intent_client_secret from query params
  const { payment_intent, payment_intent_client_secret } = req.query;

  // Retrieve payment details using payment_intent_client_secret
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_client_secret);

  // Check if payment was successful
  if (paymentIntent.status === "succeeded") {
    // Redirect or send success response as needed
    res.status(200).json({ message: "Payment successful" });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
}));

// //----free plan----
stripePaymentRouter.get(
  "/api/v1/stripe/free-plan",
  isAuthenticated,
  stripePaymentController.free
);

module.exports = stripePaymentRouter;
