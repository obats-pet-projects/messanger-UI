import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar } from '@material-ui/core/';
import UserProfile from '../UserProfile/UserProfile';
import './Container.css';

const HeaderContainer = ({ isLogged }) => {
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar className="toolbar">{isLogged ? <UserProfile /> : null}</Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

export default connect(mapStateToProps)(HeaderContainer);
