import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import Layout from 'containers/Layout/Layout';
import DietCard from 'components/DietCard/DietCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

const Landing = () => {
  const classes = useStyles();

  const myDiets = [
    {
      title: 'This Months Pain',
      description: 'My doctor is making me do it...',
      id: '1234abcd',
      restricted: 104,
      allowed: 2
    },
    {
      title: 'Whole 30 Again',
      description: 'Because I like to torture myself',
      id: '1234abcde',
      restricted: 55,
      allowed: 30
    }
  ];

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={10}>
          <Typography
            variant="h3"
            gutterBottom
          >
            My Diets
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <AddCircleOutlineOutlinedIcon fontSize="large" />
        </Grid>
        {myDiets.map((diet) => (
          <Grid item key={diet.id} xs={12} sm={6}>
            <DietCard diet={diet} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Landing;