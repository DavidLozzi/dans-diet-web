import React from 'react';
import PropTypes from 'prop-types';

import TopNavBar from 'components/TopNavBar/TopNavBar';
import BottomNav from 'components/BottomNav/BottomNav';

const Layout = ({ children, showTopNav, showBottomNav }) => {
  return (
    <div>
      {
        showTopNav &&
        <TopNavBar />
      }
      {children}
      {
        showBottomNav &&
        <BottomNav />
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