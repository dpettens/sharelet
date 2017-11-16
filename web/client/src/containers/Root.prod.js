import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import withAuth from './withAuth';
import notAllowAuth from './notAllowAuth';
import HomePage from './HomePage';
import Dashboard from "./Dashboard";
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/signin" component={notAllowAuth(SignIn)} />
      <Route path="/signup" component={notAllowAuth(SignUp)} />
      <Route path="/signout" component={withAuth(SignOut)} />
      <Route path="/dashboard" component={withAuth(Dashboard)} />
    </div>
  </Router>
);

export default Root;
