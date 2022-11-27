import React from "react";
import "../Css/signup.css";

const Signup = () => {
  return (
    <>
      <div className="section"></div>
      <div className="signup-page">
        <section className="sigup-container">
          <div>
            <input placeholder="Email" />
          </div>
          <div>
            <input placeholder="Password" />
          </div>
          <div>
            <button>Log In</button>
          </div>
          <div>
            <h3>or</h3>
          </div>
          <div>
            <button>Trouble Loggin In?</button>
          </div>
          <div>
            <h3>GET THE APP!</h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
