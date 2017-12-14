import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Root from './containers/Root';
import SiteTheme from './styles/theme';
import configureStore from './store/configureStore';
import { signInSuccess, signOutSuccess } from './actions';

const store = configureStore();
const theme = createMuiTheme(SiteTheme);
const token = localStorage.getItem('token');

if(token)
  store.dispatch(signInSuccess());
else
  store.dispatch(signOutSuccess());

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
