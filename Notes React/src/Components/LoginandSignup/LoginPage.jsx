import React, { useState } from "react";
import { Form, MainDiv, Button } from "./LoginStylled";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

const Login = () => {
  const [gmail, setGmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = e.target;

    // Firebase Database
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => navigate("/home"))
      .catch(() => alert("You email or password is incorrect"))


    // Local Storage
    // const getUserData = getLocalStorage("users");

    // const userFound = getUserData.find(
    //   (item) => item.email === email.value && item.password === password.value
    // );

    // setLocalStorage("userId", gmail);

    // if (userFound) {

    // } else {
    //   alert("user not found");
    // }
  }

  function handleGmail(e) {
    setGmail(e.target.value);
  }

  function goToSIgnUpPage() {
    navigate("/");
  }

  return (
    <MainDiv>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>

        <div>
          <label for="email">Email</label>
          <input
            value={gmail}
            onChange={handleGmail}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          ></input>
        </div>

        <div>
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          ></input>
        </div>

        <Button type="submit">Login</Button>
        <Button secondry onClick={goToSIgnUpPage}>
          Sign Up
        </Button>
      </Form>
    </MainDiv>
  );
};

export default Login;
