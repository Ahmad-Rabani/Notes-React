import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./loginstyle.scss";

const Login = () => {
  const [gmail, setGmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        navigate("/home", { replace: true });
        localStorage.setItem("userLoggedIn", gmail);
      })
      .catch(() => alert("Your email or password is incorrect"));
  }

  function handleGmail(e) {
    setGmail(e.target.value);
  }

  function goToSignUpPage() {
    navigate("/", { replace: true });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={gmail}
            onChange={handleGmail}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <button className="login-button" type="submit">
          Login
        </button>
        <button className="login-button secondary" onClick={goToSignUpPage}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
