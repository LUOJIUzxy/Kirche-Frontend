import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  //var stripe = Stripe('rk_test_51O82iyAENojRZzJnnQ3gs0Ew9fvv0EcgaNG62X5Uc8hQWecTUjqnAxw0CEI37MeNCwBk3ESt8RHbEhrWcIB0uCGZ007WTVXue1');
  //var elements = stripe.elements({ clientSecret: 'CLIENT_SECRET',});
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: '/Home',
      },
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;