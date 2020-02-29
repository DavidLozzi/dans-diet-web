import React from 'react';
import PropTypes from 'prop-types';

import TopNavBar from 'components/TopNavBar/TopNavBar';
import Footer from 'components/Footer/Footer';
import { Container, makeStyles, Button, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const myTheme = createMuiTheme();

const useStyles = makeStyles(() => ({
  buttons: {
    margin: myTheme.spacing(1)
  }
}));

const StyledButton = withStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  }
}))(Button);

const ErrorButton = withStyles({
  root: {
    color: myTheme.palette.getContrastText(myTheme.palette.error.dark),
    backgroundColor: myTheme.palette.error.dark
  }
})(StyledButton);

const WarningButton = withStyles({
  root: {
    color: myTheme.palette.getContrastText(myTheme.palette.warning.main),
    backgroundColor: myTheme.palette.warning.main
  }
})(StyledButton);

const InfoButton = withStyles({
  root: {
    color: myTheme.palette.getContrastText(myTheme.palette.info.light),
    backgroundColor: myTheme.palette.info.light
  }
})(StyledButton);

const SuccessButton = withStyles({
  root: {
    color: myTheme.palette.getContrastText(myTheme.palette.success.main),
    backgroundColor: myTheme.palette.success.main
  }
})(StyledButton);

const Layout = ({ children, showTopNav, showFooter }) => {
  const classes = useStyles();
  const showMyButtons = false;

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
        showFooter &&
        <Footer />
      }
      {showMyButtons && (
        <div className={classes.buttons}>
          <StyledButton color="primary" variant="contained">primary</StyledButton>
          <StyledButton color="secondary" variant="contained">secondary</StyledButton>
          <ErrorButton variant="contained">error dark</ErrorButton>
          <WarningButton variant="contained">warning</WarningButton>
          <InfoButton variant="contained">info light</InfoButton>
          <SuccessButton variant="contained">success</SuccessButton>
        </div>
      )
      }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.shape().isRequired,
  showTopNav: PropTypes.bool,
  showFooter: PropTypes.bool
};

Layout.defaultProps = {
  showTopNav: false,
  showFooter: false
};

export default Layout;