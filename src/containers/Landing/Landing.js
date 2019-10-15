import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from 'containers/Layout/Layout';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
});

const Landing = () => {
  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={useStyles.root}
      >
        coming soon...
      </Grid>
    </Layout>
  );
};

export default Landing;