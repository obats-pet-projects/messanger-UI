import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { IconButton, Popover } from '@material-ui/core/';
import { handleSignOut } from '../../../actions/user';
import avatar from './avatar.png';
import './UserProfile.css';

const UserProfile = ({ userData, handleSignOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = evt => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignoutClick = () => {
    handleSignOut();
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton
        aria-owns={open ? 'user-profile' : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Popover
        id="user-profile"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <div className="user-profile">
          <div className="user-profile__details">
            <div className="user-profile__avatar">
              <img src={avatar} alt="User avatar" width="96" height="96" />
            </div>
            <div className="user-profile__info">
              <div className="user-profile__credentials">
                <p className="user-profile__username">{userData.username}</p>
                <p className="user-profile__email">{userData.email}</p>
              </div>
              <a href="/#" className="user-profile__settings">
                Settings
              </a>
            </div>
          </div>
          <div className="user-profile__controls">
            <button className="user-profile__signout" type="button" onClick={handleSignoutClick}>
              Sign out
            </button>
          </div>
        </div>
      </Popover>
    </Fragment>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  isLogged: user.isLogged
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(handleSignOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
