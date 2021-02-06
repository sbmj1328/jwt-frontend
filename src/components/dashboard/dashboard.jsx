import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login, Home, Register } from "../screens";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Dashboard Component
export default function Dashboard() {
  const { userDataReducer, showSnack } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("my dashboard ", userDataReducer);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "SNACK_CLOSE",
    });
  };

  return (
    <Router>
      <Snackbar
        open={showSnack.show}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity={showSnack.severity}>{showSnack.message}</Alert>
      </Snackbar>
      {!userDataReducer.token ? (
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
