import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from "react-redux";
import { store } from './redux/store/store.js';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const queryClient = new QueryClient();
const stripePromise = loadStripe("pk_test_51PZ6vMFEr49mKCVM0KRmuPtfXEkfRzP0M5QwR2HLROhFWL3Ux0E433qRwhEiX1VhGGBy7fGvrfyM7k7m6tdwiVX500OlJvM7T8");

const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
