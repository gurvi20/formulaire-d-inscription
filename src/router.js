import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Inscription from "./inscription";
import Merci from "./merci";
import { Redirect, Switch } from "react-router-dom";

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Inscription />
        </Route>
        <Route path="/merci/:name" exact>
          <Merci />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
export default RouterPage;
