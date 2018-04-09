import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
  }
}

const composeEnhancers = composeWithDevTools({
  name: 'MyApp',
  actionsBlacklist: ['REDUX_STORAGE_SAVE']
});

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);
