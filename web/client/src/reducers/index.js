import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import outletsReducer from './outlets';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    outlets: outletsReducer
});

export default rootReducer;
