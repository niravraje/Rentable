import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import ContactUs from "./pages/contactUs";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import OwnerSignIn from "./pages/ownerSignIn";
import OwnerSignUp from "./pages/ownerSignUp";
import OwnerAccount from "./pages/ownerAccount";
import RenterAccount from "./pages/renterAccount";
import forgotPassword from "./pages/forgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userType, setUserType] = useState("renter");

  const handleLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  const handleUserType = (userTypeValue) => {
    setUserType(userTypeValue);
  };

  return (
    <Router>
      <Navbar
        loginStatus={loginStatus}
        userType={userType}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/services" exact component={Services} />
        <Route path="/contact-us" exact component={ContactUs} />

        <Route
          exact
          path="/signin"
          render={(props) => (
            <SignIn
              {...props}
              handleLogin={handleLogin}
              loginStatus={loginStatus}
              userType={userType}
              handleUserType={handleUserType}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <SignUp
              {...props}
              handleLogin={handleLogin}
              loginStatus={loginStatus}
              userType={userType}
              handleUserType={handleUserType}
            />
          )}
        />

        <Route
          exact
          path="/owner-signin"
          render={(props) => (
            <OwnerSignIn
              {...props}
              handleLogin={handleLogin}
              loginStatus={loginStatus}
              userType={userType}
              handleUserType={handleUserType}
            />
          )}
        />
        <Route
          exact
          path="/owner-signup"
          render={(props) => (
            <OwnerSignUp
              {...props}
              handleLogin={handleLogin}
              loginStatus={loginStatus}
              userType={userType}
              handleUserType={handleUserType}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/renter-account"
          loginStatus={loginStatus}
          userType={userType}
          component={RenterAccount}
        />

        <ProtectedRoute
          exact
          path="/owner-account"
          loginStatus={loginStatus}
          userType={userType}
          component={OwnerAccount}
        />

        <Route path="/forgotPassword" exact component={forgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
