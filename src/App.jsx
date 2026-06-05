import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main/Main";
import Create from "./Components/card/CreateCard";
import LoginSignupPage from "./Components/LoginandSignup/LoginSignupPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppThemeProvider } from "./theme/ThemeProvider";
import ThemeToggle from "./theme/ThemeToggle";

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <ThemeToggle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginSignupPage defaultView="signup" />} />
            <Route path="login" element={<LoginSignupPage defaultView="login" />} />
            <Route path="signup" element={<LoginSignupPage defaultView="signup" />} />
            <Route path="home" element={<Main />} />
            <Route path="create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
