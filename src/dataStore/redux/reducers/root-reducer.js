import { combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist';
import localStorage from "redux-persist/lib/storage";

import * as Login from "./login";
import * as Register from "./register";
import * as Home from "./home";

const rootReducer = persistCombineReducers(
  {
    key: "root",
    storage: localStorage,
    whitelist: ["loginReducer"],
  },
  {
    ...Login,
    ...Register,
    ...Home,
  }
);

export default rootReducer;
