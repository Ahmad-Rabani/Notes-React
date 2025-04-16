import React,{useEffect} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "./SignupStyle.scss";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");

    if(isUserLoggedIn) {
      navigate("/home", { replace: true });
    }
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((value) => console.log(value));

    navigate("/login", { replace: true });
  }

  function goToLogInPage() {
    navigate("/login", { replace: true });
  }

  return (
    <div className="MainDiv">
      <form className="Form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="Enter Your Email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" placeholder="Enter Password" required />
        </div>

        <button className="Button" type="submit">Sign Up</button>
        <button className="Button secondary" onClick={goToLogInPage}>Login</button>
      </form>
    </div>
  );
}

export default SignUp;
