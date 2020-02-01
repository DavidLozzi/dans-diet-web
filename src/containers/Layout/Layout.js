import React from 'react';
import PropTypes from 'prop-types';

import TopNavBar from 'components/TopNavBar/TopNavBar';
// import BottomNav from 'components/BottomNav/BottomNav';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));
const Layout = ({ children, showTopNav, showBottomNav }) => {
  const classes = useStyles();

  return (
    <div>
      {
        showTopNav &&
        <TopNavBar />
      }
      <Container className={classes.root}>
        {children}
      </Container>
      {
        showBottomNav && <div />
        // <BottomNav />
      }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.shape().isRequired,
  showTopNav: PropTypes.bool,
  showBottomNav: PropTypes.bool
};

Layout.defaultProps = {
  showTopNav: false,
  showBottomNav: false
};

export default Layout;