import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

import { MainDiv, Form, Button } from "./SignUpStylled";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function SignUp() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;

    // Firebase Database
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((value) => console.log(value));

    // Local Storage
    // const userData = getLocalStorage("users") || [];

    // const userFound = userData.find(
    //   (item) => item.email === email.value
    // );


    // if (userFound) {
    //   alert("User already exists");
    // } else {
    //   userData.push({
    //     user: Math.floor(Math.random() * 10000),
    //     email: email.value,
    //     password: password.value,
    //     cardData: [],
    //   });
    // }
    // setLocalStorage("users", userData);

    // email.value = "";
    // password.value = "";

    navigate("/login");
  }

  function goToLogInPage() {
    navigate("/login");
  }

  return (
    <div>
      <MainDiv>
        <Form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <div>
            <label for="email">Email</label>
            <input
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
          <Button type="submit">Sign Up</Button>
          <Button secondry onClick={goToLogInPage}>
            Login
          </Button>
        </Form>
      </MainDiv>
    </div>
  );
}

export default SignUp;
