import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import IndexPage from "@/routes/IndexPage";
import LoginPage from "@/routes/logic";
import ManagePage from "@/routes/manage";
import withHocPrivateRoute from "./components/withHocPrivateRoute";
const PriateRoute = withHocPrivateRoute(Route);

// Please use `require("history").createHashHistory` instead of `require("history/createHashHistory")

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Redirect path="/" exact to="/app" />
        <Route path="/app" component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <PriateRoute path="/setting" component={ManagePage} />
        {/* <Redirect path="**" to="/"  /> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
