import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { saveUserData } from './actions/user';
import { httpService } from './api/axios';
import Routes from './Routes';
import Header from './components/Header/Header';
import Loader from './components/UI/Loader/Loader';
import { Toaster } from './components/UI/Toaster/Toaster';

const App = ({ saveUserData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    httpService()
      .get('/auth/validate')
      .then(({ data }) => {
        if (!data.success && data.message) {
          setIsLoading(false);
          return null;
        }

        const { id, username, email } = data;
        saveUserData({ id, username, email });
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [saveUserData]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes />
          <Toaster />
        </BrowserRouter>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  loggedUser: user.loggedUser
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => {
    dispatch(saveUserData(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
