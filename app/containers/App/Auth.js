import React from "react";
import { Switch, Route } from "react-router-dom";
import Outer from "../Templates/Outer";
import { NotFound, Login } from "../pageListAsync";

class Auth extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}

export default Auth;
