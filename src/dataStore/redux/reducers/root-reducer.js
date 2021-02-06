import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import * as Login from "./login";
import * as Register from "./register";
import * as Home from "./home";
import * as SnackBar from "./snackBar";
import * as UserData from "./userData";

const rootReducer = persistCombineReducers(
  {
    key: "root",
    storage: localStorage,
    whitelist: ["userDataReducer"],
  },
  {
    ...Login,
    ...Register,
    ...Home,
    ...SnackBar,
    ...UserData,
  }
);

export default rootReducer;
