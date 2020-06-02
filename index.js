/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {
  showMovies,
  userInfo,
  setFavorite,
  setModal,
} from './src/Reducers/Reducer';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  showMovies,
  userInfo,
  setFavorite,
  setModal,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));
console.disableYellowBox = true;

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
