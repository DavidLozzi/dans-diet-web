import React from 'react';
import { Grid } from '@material-ui/core';
import Login from 'components/Login/Login';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/featured/?healthy%20food)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={0} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Login />
      </Grid>
    </Grid>
  );
};

export default Home;