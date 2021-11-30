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
import AdminRefund from "./pages/adminRefund";
import AdminMessages from "./pages/adminMessages";
import ProductDetails from "./pages/productDetails";
import EnhancedTable from "./pages/adminApproveListings";
import Payment from "./pages/productPayment";
import ProductLodgeComplaint from "./pages/productLodgeComplaint";
import AdminViewComplaints from "./pages/adminComplaints";
import ProductAddReview from "./pages/productAddReview";

function App() {
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("token") && sessionStorage.getItem("token") !== ""
      ? true
      : false
  );
  const [userType, setUserType] = useState(
    sessionStorage.getItem("user_type") &&
      sessionStorage.getItem("user_type") !== ""
      ? sessionStorage.getItem("user_type")
      : ""
  );
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") &&
      sessionStorage.getItem("username") !== ""
      ? sessionStorage.getItem("username")
      : ""
  );

  const handleLogin = (usernameValue) => {
    setLoginStatus(true);
    setUsername(usernameValue);
    sessionStorage.setItem("username", usernameValue);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    sessionStorage.setItem("user_type", "");
    sessionStorage.setItem("token", "");
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
        <ProtectedRoute
          exact
          path="/admin-refund"
          loginStatus={loginStatus}
          userType={userType}
          component={AdminRefund}
        />
        <ProtectedRoute
          exact
          path="/admin-approve-listings"
          loginStatus={loginStatus}
          userType={userType}
          component={EnhancedTable}
        />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/add-new-listing" exact component={OwnerAddNewListing} />
        <Route path="/product-details" exact component={ProductDetails} />
        <Route path="/product-payment" exact component={Payment} />
        <Route path="/admin-complaints" exact component={AdminViewComplaints} />
        <Route
          path="/product-lodge-complaint"
          exact
          component={ProductLodgeComplaint}
        />
        <Route path="/product-add-review" exact component={ProductAddReview} />
      </Switch>
    </Router>
  );
}

export default App;
