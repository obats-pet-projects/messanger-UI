import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, Toolbar, IconButton, MenuItem, Menu } from '@material-ui/core/';
import './Header.css';
import { handleSignOut } from '../../actions/user';

const Header = ({ handleSignOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignoutClick = () => {
    handleSignOut();
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={onSignoutClick}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(handleSignOut());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
