import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  persistState(),
)

const configureStore = initialState => createStore(
    rootReducer,
    initialState,
    enhancer
);

export default configureStore;
