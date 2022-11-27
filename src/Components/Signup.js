import React from 'react';
import '../Css/signup.css';
import { signup } from '../db/signup';
import { auth } from '../db/signup';

const Signup = () => {
  const createUser = () => {
    const email = document.getElementById('email').value;
    const pw = document.getElementById('password').value;
    signup(email, pw);
  };

  return (
    <>
      <div className="section"></div>
      <div className="signup-page">
        <section className="sigup-container">
          <div>
            <input placeholder="Email" htmlFor="email" id="email" />
          </div>
          <div>
            <input placeholder="Password" htmlFor="password" id="password" />
          </div>
          <div>
            <button onClick={createUser}>Log In</button>
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
