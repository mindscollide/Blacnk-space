import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { actionReducer, loaderReducer } from "./Reducers";

const AppReducer = combineReducers({
  LoaderReducer: loaderReducer,
  actionReducer: actionReducer,
});

const store = configureStore(
  { reducer: AppReducer },
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
