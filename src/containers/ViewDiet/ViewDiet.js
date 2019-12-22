import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import DietCard from 'components/DietCard/DietCard';
import FoodList from 'components/FoodList/FoodList';
import Icon from '@mdi/react';
import { mdiBarleyOff } from '@mdi/js';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';

import Layout from 'containers/Layout/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

const ViewDiet = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myDiet = useSelector((state) => state[dietName].diet);
  const isLoaded = useSelector((state) => !state[dietName].loading);
  const [idProvided, setidProvided] = useState(false);

  useEffect(() => {
    if (match.params.shareId) {
      setidProvided(true);
      dietActions.getDietbyShareId(match.params.shareId)(dispatch);
    } else {
      setidProvided(false);
      dietActions.setLoadingFalse()(dispatch);
    }
  }, []);

  return (
    <Layout showTopNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={0} sm={1} />
        {!isLoaded &&
          <div> LOADING...</div>
        }
        {isLoaded &&
          (
            <Grid item xs={12} sm={10}>
              {!idProvided &&
                (
                  <div>Looks like you're missing a share id. Contact your friend and ask for the URL again.</div>
                )}
              {idProvided &&
                (
                  <>
                    <DietCard diet={myDiet} showTotals={false} readOnly titlePrefix={`${myDiet.user.first_name}'s `} />
                    <h3>
                      <Icon path={mdiBarleyOff} size={1} className={classes.icons} />
                      Restricted
                    </h3>
                    <FoodList
                      foods={myDiet.foods && myDiet.foods.filter((f) => f.restriction === 'Restricted')}
                      diet={myDiet}
                      readonly
                    />
                    <h3>
                      <RestaurantOutlinedIcon color="primary" fontSize="small" className={classes.icons} />
                      Allowed
                     </h3>
                    <FoodList
                      foods={myDiet.foods && myDiet.foods.filter((f) => f.restriction === 'Allowed')}
                      diet={myDiet}
                      readonly
                    />
                  </>
                )
              }
            </Grid>
          )
        }
      </Grid>
    </Layout>
  );
};

export default ViewDiet;