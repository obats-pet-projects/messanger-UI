import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MessageView from './components/Message/View/View';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:id" component={MessageView} />
    </Switch>
  );
};

export default Routes;
