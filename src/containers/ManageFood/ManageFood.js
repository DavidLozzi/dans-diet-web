import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import Layout from 'containers/Layout/Layout';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import queryString from 'query-string';
import history from 'redux/history';
import ManageFoodForm from 'components/ManageFoodForm/ManageFoodForm';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10
  },
}));

const ManageFood = ({ match, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myDiet = useSelector((state) => state[dietName].diet);
  const { foodId, restriction } = queryString.parse(location.search);
  const [food, setFood] = useState({
    _id: foodId,
    restriction,
    name: '',
    category: '',
    notes: ''
  });

  useEffect(() => {
    if (!myDiet || !myDiet.title) {
      dispatch(dietActions.getDiet(match.params.dietId));
    }
  }, [myDiet, match.params.dietId, dispatch]);

  useEffect(() => {
    if (myDiet && myDiet.foods) {
      setFood(myDiet.foods.filter((f) => f._id === foodId)[0]);
    }
  }, [myDiet, foodId]);

  return (
    <Layout showTopNav showFooter>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={12}>
          <ManageFoodForm
            diet={myDiet}
            food={food}
            onDone={() => history.goBack()}
            onCancel={() => history.goBack()}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

ManageFood.propTypes = {
  match: PropTypes.shape().isRequired, // URL match parameters
  location: PropTypes.shape().isRequired, // this.props.location
};

export default ManageFood;