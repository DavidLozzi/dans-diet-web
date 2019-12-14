import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import Layout from 'containers/Layout/Layout';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10
  },
}));

const ManageFood = ({ match, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const restrict = queryString.parse(location.search).restriction;
  const myDiet = useSelector((state) => state[dietName].diet);

  useEffect(() => {
    if (!myDiet || !myDiet.title) {
      dietActions.getDiet(match.params.dietId)(dispatch);
    }
  }, []);

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item>
          <h3>manage food {myDiet.title} {restrict} </h3>
        </Grid>
      </Grid>
    </Layout>
  );
};

ManageFood.propTypes = {
  match: PropTypes.shape.isRequired, // URL match parameters
  location: PropTypes.shape.isRequired, // this.props.location
};

export default ManageFood;