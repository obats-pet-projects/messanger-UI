import React, { Fragment } from 'react';
import MessagesContainer from '../Messages/MessageContainer';
import './HomePage.css';
import Header from '../Header/Header';

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <MessagesContainer />
    </Fragment>
  );
};

export default HomePage;
