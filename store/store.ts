import { productDetailReducer } from '../component/components/screens/productDetail/reducer';
import { productFilterReducer } from './../modules/productListing/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import counter from './counter/reducer';
import users from './user/reducer';
import aboutReducer from './about/aboutReducer';
import { productReducer } from '../modules/productListing/reducer';
import { configReducer, homeReducer, loadingReducer } from './home/reducer';
import { recommendReducer } from '../component/common/recommendationCarousel/reducer';
import { shoppingBagReducer } from '../component/common/addToCart/reducer';

const combinedReducer = combineReducers({
  counter,
  users,
  homeReducer: homeReducer,
  configReducer: configReducer,
  loadingReducer: loadingReducer,
  aboutReducer,
  productReducer,
  productFilterReducer,
  // aboutReducer: aboutReducer,
  shoppingBagReducer: shoppingBagReducer,
  productDetailReducer,
  recommendReducer,
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

export const store = initStore();

export const wrapper = createWrapper(initStore);
