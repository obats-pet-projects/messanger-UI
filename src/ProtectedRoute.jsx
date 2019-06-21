import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...protectedRouteProps }) => (
  <Route
    {...protectedRouteProps}
    render={props =>
      protectedRouteProps.isLogged ? <Component {...props} /> : <Redirect to="/auth/signin" />
    }
  />
);

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
