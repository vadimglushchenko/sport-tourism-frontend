import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
import NewSportTrip from "./containers/NewSportTrip";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AppliedRoute path="/addSportTrip" exact component={NewSportTrip} appProps={appProps} />
            { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound} />
        </Switch>
    );
}
