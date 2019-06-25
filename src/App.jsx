import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fetchUserData } from './actions/user';
import Loader from './components/UI/Loader/Loader';
import Routes from './Routes';
import Header from './components/Header/Header';
import { Toaster } from './components/UI/Toaster/Toaster';

const App = ({ isLoading, fetchUserData }) => {
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Fragment>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ loader }) => ({
  isLoading: loader.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => {
    dispatch(fetchUserData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
