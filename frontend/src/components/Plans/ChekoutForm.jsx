import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AlertMessage from "../Alert/AlertMessage";
import { paymentIntentAPI } from "../../APIServices/stripe/plan";

const CheckoutForm = () => {
  // Get the id of the plan
  const { planId } = useParams();

  // Mutation
  const paymentMutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: paymentIntentAPI,
  });

  // Configure Stripe
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle submit for payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!elements || !stripe) {
      return;
    }

    // Submit the form elements
    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setErrorMessage(submitErr.message);
      return;
    }

    try {
      // Fetch the client secret from the server
      const result = await paymentMutation.mutateAsync(planId);
      const clientSecret = result.clientSecret;
      console.log('paymentIntentAPI response:', result);
      console.log('secret :', clientSecret);


      if (!clientSecret) {
        setErrorMessage("Client secret not found");
        return;
      }

      // Confirm the payment using the client secret
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://backend-bloggie.onrender.com/api/v1/stripe/success",
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md"
      >
        {/* Stripe payment element */}
        <div className="mb-4">
          <PaymentElement />
        </div>
        {/* Display loading */}
        {paymentMutation.isPending && (
          <AlertMessage type="loading" message="Processing, please wait..." />
        )}

        {/* Display error */}
        {paymentMutation.isError && (
          <AlertMessage
            type="error"
            message={paymentMutation.error?.response?.data?.message}
          />
        )}
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
