import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import ContactUs from "./pages/contactUs";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import RenterAccount from "./pages/renterAccount";
import forgotPassword from "./pages/forgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  return (
    <Router>
      <Navbar loginStatus={loginStatus} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/services" exact component={Services} />
        <Route path="/contact-us" exact component={ContactUs} />

        <Route
          exact
          path="/signin"
          render={(props) => (
            <Signin
              {...props}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              loginStatus={loginStatus}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <Signup
              {...props}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              loginStatus={loginStatus}
            />
          )}
        />
        {/* <Route path="/signin" exact component={Signin} /> */}
        <Route path="/signup" exact component={Signup} />
        <ProtectedRoute
          exact
          path="/renter-account"
          loginStatus={loginStatus}
          component={RenterAccount}
        />

        <Route path="/forgotPassword" exact component={forgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
