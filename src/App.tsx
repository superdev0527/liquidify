import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Validators from "./pages/Validators";
import Myaddresses from "./pages/Myaddresses";
import Profile from "./pages/Profile";
import Getintouch from "pages/Getintouch";

const App = () => {
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/getintouch">
            <Getintouch />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/rewards">
            <Rewards />
          </Route>
          <Route exact path="/validators">
            <Validators />
          </Route>
          <Route exact path="/myaddresses">
            <Myaddresses />
          </Route>
          <Route exact path="/myprofile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
