import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from './components/HomePage/HomePage';
import MessageView from './components/Message/View/View';
import MessageContainer from './components/Message/Container/Container';
import SignUp from './components/Auth/SignUp/SignUp';
import SignIn from './components/Auth/SignIn/SignIn';

const Routes = () => (
  <Fragment>
    <Switch>
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/mail/category" component={MessageContainer} />
      <ProtectedRoute exact path="/:id" component={MessageView} />
      <Route exact path="/auth/signup" component={SignUp} />
      <Route exact path="/auth/signin" component={SignIn} />
    </Switch>
  </Fragment>
);

export default Routes;
