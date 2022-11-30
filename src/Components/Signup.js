import React from "react";
import "../Css/signup.css";
import { signup } from "../db/signup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";

const Signup = ({ openSignup, children, onSignupClose }) => {
  const navigate = useNavigate();
  const createUser = () => {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const username = document.getElementById("username").value;
    const location = document.getElementById("location").value;

    console.log("email", email);
    console.log("pw", email);
    console.log("lastname", lastName);
    console.log("firstname", firstName);
    console.log("username", username);
    console.log("location", location);

    signup(email, pw, lastName, firstName, username, location);
    onAuthStateChanged(auth, function (user) {
      if (user) {
        navigate("/profile");
      } else {
        // No user is signed in.
      }
    });
  };

  if (!openSignup) return null;
  return (
    <>
      <div className="popup-overlay">
        <div className="signup-popup">
          <div className="signup-close">
            <button onClick={onSignupClose} className="round-button">
              x
            </button>
          </div>
          {children}
          <div className="form-container">
            <h3>GET STARTED</h3>
            <p>
              By clicking Sign Up, you agree to our <a href="/">Terms</a>. Learn
              how we process your data in our <a href="/">Privacy Policy</a> and{" "}
              <a href="/">Cookie Policy</a>.
            </p>
            <input
              placeholder="Email"
              htmlFor="email"
              id="email"
              className="form-input"
            />
            <input
              placeholder="First Name"
              htmlFor="firstName"
              id="firstName"
              className="form-input"
            />
            <input
              placeholder="Last Name"
              htmlFor="lastName"
              id="lastName"
              className="form-input"
            />
            <input
              placeholder="Username"
              className="form-input"
              htmlFor="username"
              id="username"
            />
            <input
              placeholder="Password"
              htmlFor="password"
              id="password"
              type="password"
            />
            <label htmlFor="location" className="state">
              State:
            </label>
            <div className="select">
              <select name="state" id="location">
                <option value="select_state" selected disabled>
                  Select State
                </option>

                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>

                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>

                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>

                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>

                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>

                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>

                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>

                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>

                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>

                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <button onClick={createUser} className="signup-button">
              Sign Up
            </button>
          </div>
          <hr className="or-hr" />
          <div className="icons">
            <img
              src={require("../img/Google.png")}
              alt="Google icon"
              className="icon"
            />
            <img
              src={require("../img/Apple.png")}
              alt="Apple icon"
              className="icon"
            />
            <img
              src={require("../img/Facebook.png")}
              alt="Facebook icon"
              className="icon"
            />
          </div>
          <p className="login-link">
            Have an account? <a href="/">Log in</a>
          </p>
          <hr className="line-hr" />
          <h3>GET THE APP!</h3>
          <div className="apps-container">
            <img
              src={require("../img/DownloadOnTheAppStore.png")}
              alt="App Store icon"
              className="app-store"
            />
            <img
              src={require("../img/GooglePlay.png")}
              alt="Google Play icon"
              className="google-play"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
