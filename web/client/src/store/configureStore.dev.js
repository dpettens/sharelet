import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { persistState as  persistStateDevTools } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const enhancer = compose(
    applyMiddleware(thunk),
    persistState(),
    DevTools.instrument(),
    persistStateDevTools(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

const configureStore = initialState => {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot)
    {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
}

export default configureStore;
