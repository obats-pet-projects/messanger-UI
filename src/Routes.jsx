import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MessageView from './components/Message/View/View';
import MessageContainer from './components/Message/Container/Container';
import Header from './components/Header/Header';

const Routes = () => (
  <Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/mail/category" component={MessageContainer} />
      <Route exact path="/:id" component={MessageView} />
    </Switch>
  </Fragment>
);

export default Routes;
