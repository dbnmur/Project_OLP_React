import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newCourse from './counter';

export default combineReducers({
  router: routerReducer,
  newCourse
});
