import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import ContactUs from "./pages/contactUs";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import OwnerSignIn from "./pages/ownerSignIn";
import OwnerSignUp from "./pages/ownerSignUp";
import OwnerDashboard from "./pages/ownerDashboard";
import OwnerAddNewListing from "./pages/ownerAddNewListing";
import RenterAccount from "./pages/renterAccount";
import RenterDashboard from "./pages/renterDashboard";
import ForgotPassword from "./pages/forgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("token") ? true : false
  );
  const [userType, setUserType] = useState(
    sessionStorage.getItem("user_type")
      ? sessionStorage.getItem("user_type")
      : ""
  );

  const handleLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  const handleUserType = (userTypeValue) => {
    setUserType(userTypeValue);
    sessionStorage.setItem("user_type", userTypeValue);
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
          path="/renter-dashboard"
          loginStatus={loginStatus}
          userType={userType}
          component={RenterDashboard}
        />

        <ProtectedRoute
          exact
          path="/owner-dashboard"
          loginStatus={loginStatus}
          userType={userType}
          component={OwnerDashboard}
        />
        <ProtectedRoute
          exact
          path="/admin-dashboard"
          loginStatus={loginStatus}
          userType={userType}
          component={AdminDashboard}
        />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/add-new-listing" exact component={OwnerAddNewListing} />
      </Switch>
    </Router>
  );
}

export default App;
