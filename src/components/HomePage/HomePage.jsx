import React, { Fragment } from 'react';
import MessageContainer from '../Message/Container/Container';
import './HomePage.css';
import Header from '../Header/Header';

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <MessageContainer />
    </Fragment>
  );
};

export default HomePage;
