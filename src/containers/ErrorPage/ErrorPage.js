import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from 'containers/Layout/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  icons: {
    fill: theme.palette.grey,
    marginRight: theme.spacing()
  },
  addIcon: {
    float: 'right',
    marginRight: theme.spacing(),
    color: theme.palette.grey[500]
  }
}));

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={12}>
          Oops, page not found
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ErrorPage;