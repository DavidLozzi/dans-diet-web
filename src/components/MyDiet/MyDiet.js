import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'config';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import DietCard from 'components/DietCard/DietCard';
import CategoryFoodList from 'components/CategoryFoodList/CategoryFoodList';
import AllowedIcon from 'components/AllowedIcon/AllowedIcon';
import RestrictedIcon from 'components/RestrictedIcon/RestrictedIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  icons: {
    marginRight: theme.spacing(),
  }
}));

const MyDiet = ({ dietId, shareId, readOnly }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myDiet = useSelector((state) => state[dietName].diet);
  const loading = useSelector((state) => state[dietName].loading);
  const [dietLoaded, setDietLoaded] = useState(false);

  useEffect(() => {
    if (dietId) {
      dietActions.getDiet(dietId)(dispatch);
    } else if (shareId) {
      dietActions.getDietbyShareId(shareId)(dispatch);
    }
  }, [dietId, shareId, dispatch]);

  useEffect(() => {
    if (!loading && !dietLoaded) {
      setDietLoaded(true);
    }
  }, [loading, dietLoaded]);
  return (
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
            <DietCard
              diet={myDiet}
              showManage={false}
              readOnly={readOnly}
              showTotals={false}
            />
            <CategoryFoodList
              myDiet={myDiet}
              title="Restricted Foods"
              icon={<RestrictedIcon />}
              action={CONFIG.RESTRICTIONS.RESTRICTED}
              readOnly={readOnly}
            />
            <CategoryFoodList
              myDiet={myDiet}
              title="Allowed Foods"
              icon={<AllowedIcon />}
              action={CONFIG.RESTRICTIONS.ALLOWED}
              readOnly={readOnly}
            />
          </Grid>
        )
      }
    </Grid>
  );
};

MyDiet.propTypes = {
  dietId: PropTypes.string,
  shareId: PropTypes.string,
  readOnly: PropTypes.bool
};

MyDiet.defaultProps = {
  readOnly: false,
  dietId: null,
  shareId: null
};

export default MyDiet;