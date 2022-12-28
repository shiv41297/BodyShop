import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import counter from "./counter/reducer";
import users from "./user/reducer";
import {
  configReducer,
  homeReducer,
  loadingReducer,
} from "../component/components/pagesComponents/home/reducer";

const combinedReducer = combineReducers({
  counter,
  users,
  homeReducer: homeReducer,
  configReducer: configReducer,
  loadingReducer: loadingReducer,
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

const initStore = () => {
  return createStore(masterReducer, composeWithDevTools(applyMiddleware()));
};

export const wrapper = createWrapper(initStore);
