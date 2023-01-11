const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MO9q1CzE3h0QeSY7mTWowRvrEonoN0nVIfZ7HTfjWJVeYsprXpLw7hzZutyyfSjuSH9Q31fH31EvfNJbqTk4UwJ001hWznDt9"
); //input the secret key

//Setting up the API

//1-App config
const app = express();

//2-Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//3-API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

//4-Listen command
exports.api = functions.https.onRequest(app);
