import { createStore, applyMiddleware } from "redux";
import RootReducers from "../reducers/root-reducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const store = createStore(RootReducers, applyMiddleware(thunk));

export const persistor = persistStore(store);
