import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CONFIG from 'config';
import history from 'redux/history';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import DietCard from 'components/DietCard/DietCard';
import FoodList from 'components/FoodList/FoodList';
import Icon from '@mdi/react';
import { mdiBarleyOff } from '@mdi/js';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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

const MyDiet = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myDiet = useSelector((state) => state[dietName].diet);
  const loading = useSelector((state) => state[dietName].loading);
  const [dietLoaded, setDietLoaded] = useState(false);

  useEffect(() => {
    dispatch(dietActions.getDiet(match.params.dietId));
  }, [dispatch, match]);

  useEffect(() => {
    if (!loading && !dietLoaded) {
      setDietLoaded(true);
    }
  }, [loading, dietLoaded]);

  const addFood = (restrict) => {
    history.push(`${CONFIG.UI_URL.FOOD(myDiet._id)}?restriction=${restrict}`);
  };

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={12} sm={1} />
        {loading && !dietLoaded &&
          <div>LOADING...</div>
        }
        {(!loading || dietLoaded) &&
          (
            <Grid item xs={12} sm={10}>
              <DietCard diet={myDiet} showManage={false} showTotals={false} />
              <h3>
                <Icon path={mdiBarleyOff} size={1} className={classes.icons} />
                Restricted
                <AddCircleOutlineOutlinedIcon className={classes.addIcon} onClick={() => addFood('Restricted')} />
              </h3>
              <FoodList
                foods={myDiet.foods && myDiet.foods.filter((f) => f.restriction === 'Restricted')}
                diet={myDiet}
              />
              <h3>
                <RestaurantOutlinedIcon color="primary" fontSize="small" className={classes.icons} />
                Allowed
                <AddCircleOutlineOutlinedIcon className={classes.addIcon} onClick={() => addFood('Allowed')} />
              </h3>
              <FoodList
                foods={myDiet.foods && myDiet.foods.filter((f) => f.restriction === 'Allowed')}
                diet={myDiet}
              />
            </Grid>
          )
        }
      </Grid>
    </Layout>
  );
};

export default MyDiet;