import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from 'containers/Layout/Layout';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
});

const MyDiet = () => {
  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={useStyles.root}
      >
        View, edit and share your diet.
      </Grid>
    </Layout>
  );
};

export default MyDiet;