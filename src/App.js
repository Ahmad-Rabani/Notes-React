import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main/Main";
import Create from "./Components/card/CreateCard";
import Login from "./Components/LoginandSignup/LoginPage";
import SignUp from "./Components/LoginandSignup/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Main/>} />
          <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
