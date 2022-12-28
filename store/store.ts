import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import counter from "./counter/reducer";
import users from "./user/reducer";

import aboutReducer from "./about/aboutReducer";
import { productDetailReducer } from "../component/components/productDetail/reducer";
import { configReducer, homeReducer, loadingReducer } from "./home/reducer";

const combinedReducer = combineReducers({
  counter,
  users,
  homeReducer: homeReducer,
  configReducer: configReducer,
  loadingReducer: loadingReducer,
  aboutReducer: aboutReducer,
  productDetailReducer: productDetailReducer,
});

// @ts-ignore
const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = () => {
  return createStore(
    masterReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export const wrapper = createWrapper(initStore);
