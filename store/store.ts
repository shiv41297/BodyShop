import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import counter from "./counter/reducer";
import users from "./user/reducer";
import {
  homeReducer,
  configReducer,
  loadingReducer,
} from "../component/state/reducers/homeReducer";

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
      ...state,
      counter: {
        count: state.counter.count + action.payload.counter.count,
      },
      users: {
        users: [
          // @ts-ignore
          ...new Set([...action.payload.users.users, ...state.users.users]),
        ],
      },
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
