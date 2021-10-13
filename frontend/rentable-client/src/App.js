import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import RenterHome from "./pages/renterHome";
import forgotPassword from "./pages/forgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/services" exact component={Services} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <ProtectedRoute exact path="/renterHome" component={RenterHome} />

        <Route path="/forgotPassword" exact component={forgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
