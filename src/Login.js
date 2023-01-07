import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    /*We don't want the page to refresh*/
    //Do some fancy firebase stuffs
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    //Do some fancy firebase stuffs
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //It successfully created a new user with email and password
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="wrapper">
        <div className="login__container">
          <h1>Sign in</h1>

          <form>
            <h5>Email or mobile phone number</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              onClick={signIn}
              className="login__signInButton"
            >
              Sign in
            </button>
          </form>
          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
        </div>

        <div className="login__newAccount">
          <h5>
            <span>New to Amazon?</span>
          </h5>

          <button onClick={register} className="login__registerButton">
            Create your Amazon account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
