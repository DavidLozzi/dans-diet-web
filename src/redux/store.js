import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import history from 'redux/history';

import { name as myDietReducerName, reducer as myDietReducer } from 'redux/api/myDiet/myDiet';
import { name as groceriesReducerName, reducer as groceriesReducer } from 'redux/api/groceries/groceries';
import { name as photosReducerName, reducer as photosReducer } from 'redux/api/photos/photos';

const middleware = [ // Order dependent
  thunkMiddleware, // Enables actions to return functions
  routerMiddleware(history) // Enables dispatching actions
];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger({ collapsed: true })); // Must be at bottom
}

const store = createStore(
  combineReducers({
    [myDietReducerName]: myDietReducer,
    [groceriesReducerName]: groceriesReducer,
    [photosReducerName]: photosReducer,
    router: connectRouter(history)
  }),
  compose(applyMiddleware(...middleware))
);

export default store;