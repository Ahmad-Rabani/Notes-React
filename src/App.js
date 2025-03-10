import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main/Main";
import Create from "./Components/card/CreateCard";
import Login from "./Components/LoginandSignup/LoginPage";
import SignUp from "./Components/LoginandSignup/SignUp";

import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Main/>} />
          <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
