import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login, Home, Register } from "../screens";
import { useDispatch, useSelector } from "react-redux";

// Dashboard Component
export default function Dashboard() {
  const { loginReducer } = useSelector((state) => state);
  useEffect(() => {
    console.log("my dashboard ", loginReducer.data);
  }, []);
  return (
    <Router>
      {loginReducer.data ? (
        <Switch>
          <Route
            path="/auth"
            render={({ match: { path } }) => (
              <>
                <Route path={`${path}/login`} component={Login} exact />
                <Route path={`${path}/register`} component={Register} />
              </>
            )}
          />
          <Redirect path="*" to="/auth/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/home" component={Home} exact />
          <Redirect path="*" to="/home" />
        </Switch>
      )}
    </Router>
  );
}
