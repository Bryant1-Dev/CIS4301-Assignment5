import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NavBar from "./components/navbar.component";
import Home from "./pages/Home";
import Flowers from "./pages/Flowers";
import Sightings from "./pages/Sightings";
const App = props => {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/flowers" component={Flowers} />
          <Route path="/sightings" component={Sightings} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
