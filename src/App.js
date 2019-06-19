import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { saveUserData } from './actions/user';
import axios from './api/axios';
import Routes from './Routes';
import Header from './components/Header/Header';
import Loader from './components/UI/Loader/Loader';
import { Toaster } from './components/UI/Toaster/Toaster';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/auth/validate')
      .then(({ data }) => {
        const { id, username, email } = data;
        saveUserData({ id, username, email });
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

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
