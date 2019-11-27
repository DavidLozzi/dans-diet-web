import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import DietCard from 'components/DietCard/DietCard';

import Layout from 'containers/Layout/Layout';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
});

const MyDiet = ({ match }) => {
  const dispatch = useDispatch();
  const myDiet = useSelector((state) => state[dietName].diet);
  const loading = useSelector((state) => state[dietName].loading);

  useEffect(() => {
    dietActions.getDiet(match.params.id)(dispatch);
  }, []);

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={useStyles.root}
      >
        {loading &&
          <div>LOADING {match.params.id}</div>
        }
        {!loading &&
          (
          <Grid item xs={12} sm={6}>
            <DietCard diet={myDiet} />
          </Grid>
          )
        }
      </Grid>
    </Layout>
  );
};

export default MyDiet;