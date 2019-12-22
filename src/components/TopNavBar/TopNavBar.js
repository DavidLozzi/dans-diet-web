import React, { useState, useEffect } from 'react';
import CONFIG from 'config';
import parse from 'html-react-parser';
import history from 'redux/history';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { logoutUser as logoutUserUtil, isUserLoggedIn } from 'utils/accountUtil/accountUtil';
import TopNavMenu from 'components/TopNavMenu/TopNavMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNavBar = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
    console.log(loggedIn);
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const loginUser = () => {
    history.push(CONFIG.HOME);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="primary"
        component="nav"
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {parse(CONFIG.APP_NAME)}
          </Typography>
          {loggedIn ?
            (
              <Button
                color="inherit"
                onClick={logoutUserUtil}
              >
                Log Out
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={loginUser}
              >
                Log In
              </Button>

            )
          }
        </Toolbar>
      </AppBar>
      <TopNavMenu open={openMenu} closeMenu={toggleMenu} />
    </div>
  );
};

export default TopNavBar;