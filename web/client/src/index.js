import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Root from './containers/Root';
import SiteTheme from './styles/theme';
import configureStore from './store/configureStore';
import { authenticated, notAuthenticated } from './actions';

const store = configureStore();
const theme = createMuiTheme(SiteTheme);
const token = localStorage.getItem('token');

// If a token exist then set authenticated value of redux to true otherwise false
if(token)
  store.dispatch(authenticated());
else
  store.dispatch(notAuthenticated());

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
