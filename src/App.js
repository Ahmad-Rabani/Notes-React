import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main/Main";
import Create from "./Components/card/CreateCard";
import LoginSignupPage from "./Components/LoginandSignup/LoginSignupPage";

import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginSignupPage defaultView="signup" />} />
            <Route path="login" element={<LoginSignupPage defaultView="login" />} />
            <Route path="signup" element={<LoginSignupPage defaultView="signup" />} />
            <Route path="home" element={<Main />} />
            <Route path="create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
