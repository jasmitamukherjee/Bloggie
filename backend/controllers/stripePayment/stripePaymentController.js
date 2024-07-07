const stripe =require("stripe")(process.env.STRIPE_KEY);
const asyncHandler = require("express-async-handler");
const  mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const User = require("../../models/User/User");
const Payment = require("../../models/Payment/Payment");

const stripePaymentController = {
    //payment
    payment: asyncHandler(async (req, res) => {
        //!. Get the plan ID
        const { subscriptionPlanId } = req.body;
        //!. Check for the valid id of the plan
        if (!mongoose.isValidObjectId(subscriptionPlanId)) {
          return res.json({ message: "Invalid subscription plan" });
        }
        //! Find the plan
        const plan = await Plan.findById(subscriptionPlanId);
        if (!plan) {
          return res.json({ message: "Plan not found" });
        }
        //! get the user
        const user = req.user;
        //! Create payment intent/making the payment
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: plan.price * 10,
            currency: "usd",
            // add some metadata
            metadata: {
              userId: user?.toString(),
              subscriptionPlanId,
            },
          });
          //! Send the response
          res.json({
            clientSecret: paymentIntent.client_secret,
            subscriptionPlanId,
            paymentIntent,
          });
        } catch (error) {
          res.json({ error });
        }
      }),
   //verigy
verify: asyncHandler(async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not succeeded" });
    }

    const metadata = paymentIntent.metadata;
    const subscriptionPlanId = metadata?.subscriptionPlanId;
    const userId = metadata.userId;

    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const amount = paymentIntent.amount / 10;
    const currency = paymentIntent.currency;

    const newPayment = await Payment.create({
      user: userId,
      subscriptionPlan: subscriptionPlanId,
      status: "success",
      amount,
      currency,
      reference: paymentId,
    });

    if (newPayment) {
      userFound.hasSelectedPlan = true;
      userFound.plan = subscriptionPlanId;
      await userFound.save();
    }

    res.json({
      status: true,
      message: "Payment has been verified and User is updated",
      userFound,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}),

    //Free plan
    free: asyncHandler(async (req, res) => {
      //check for the user
      const user = await User.findById(req.user);
      if (!user) {
        throw new Error("User not found");
      }
      //update the user field
      user.hasSelectedPlan = true;
      await user.save();
      //send the response
      res.json({
        status: true,
        message: "Payment verified, user updated",
      });
    }),
}

module.exports = stripePaymentController;