// reducers/index.js

import {combineReducers} from 'redux';
import auth from './authReducer';
import activeHome from './loginReducer';

const rootReducer = combineReducers({
  auth,
  activeHome,
});

export default rootReducer;
