import React from "react" 
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from './pages'
import About from './pages/about'
import Services from './pages/services'
import Signin from './pages/signin'
import Signup from './pages/signup'
import forgotPassword from "./pages/forgotPassword"

function App() {

  return (
      <Router> 
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/services" exact component={Services} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgotPassword" exact component={forgotPassword} />
        </Switch>
      </Router>
  );
}

export default App;
