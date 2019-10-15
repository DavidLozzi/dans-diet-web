import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import history from 'redux/history';

import { name as myDietReducerName, reducer as myDietReducer } from 'redux/api/myDiet/myDiet';

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
    router: connectRouter(history)
  }),
  compose(applyMiddleware(...middleware))
);

export default store;