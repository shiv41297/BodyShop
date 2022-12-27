import { combineReducers } from "redux";
import {
    loadingReducer,
    homeReducer,
    configReducer,
  } from "../reducers/homeReducer";

// Import all reducers


const reducers = combineReducers({
    homeReducer: homeReducer,
    configReducer: configReducer,

    loadingReducer: loadingReducer,
})

export default reducers;