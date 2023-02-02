import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { getCartTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    //Whenever the cart changes, it makes a request to change the clientSecret so Stripe charges the customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  const handleSubmit = async (event) => {
    //Do all the fancy stripe stuffs
    event.preventDefault();
    setProcessing(true); //This will block the user of clicking the Buy button so many times.

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        console.log("THE SECRET IS >>>", paymentIntent);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details

    //if the event is empty then disable it
    //if there's an error show the error message otherwise show nothing.
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="checkout__section">
          <Link to="/">
            <img
              className="checkout__logo"
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
          </Link>
          <h1>
            Checkout (<Link to="/checkout">{cart?.length} items</Link>)
          </h1>
        </div>

        <div className="payment__section">
          <span className="payment__step">
            <h3>1</h3>
          </span>
          <div className="payment__title">
            <h3> Shipping address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
      </div>

      <div className="payment__section">
        <span className="payment__step">
          <h3>2</h3>
        </span>
        <div className="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {/*For every item in the cart, I want to return whatever I had in the CheckoutProduct */}
          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="payment__section">
        <span className="payment__step">
          <h3>3</h3>
        </span>
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
      <div className="payment__section"></div>
    </div>
  );
}

export default Payment;
//{error && <div>{error}</div>} : if there's an error only then show the div that the error is in
