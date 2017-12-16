import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import alertReducer from './alert';
import authReducer from './auth';
import outletsReducer from './outlets';
import userReducer from './user';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  form: formReducer,
  outlets: outletsReducer,
  user: userReducer
});

export default rootReducer;
