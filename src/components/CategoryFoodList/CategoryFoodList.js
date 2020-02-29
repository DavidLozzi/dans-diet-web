import React from 'react';
import PropTypes from 'prop-types';
import history from 'redux/history';
import CONFIG from 'config';

import { Paper, Typography, makeStyles } from '@material-ui/core';
import FoodList from 'components/FoodList/FoodList';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    margin: theme.spacing()
  },
  icons: {
    marginRight: theme.spacing(),
  },
  addIcon: {
    float: 'right',
    marginRight: theme.spacing(),
    color: theme.palette.grey[700]
  },
  sectionTitle: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(),
    borderRadiusTopLeft: theme.spacing(),
    borderRadiusTopRight: theme.spacing()
  }
}));

const CategoryFoodList = ({ myDiet, title, icon, action, readOnly }) => {
  const classes = useStyles();

  const addFood = (restrict) => {
    history.push(`${CONFIG.UI_URL.FOOD(myDiet._id)}?restriction=${restrict}`);
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h3" className={classes.sectionTitle}>
        {icon}
        {title}
        {!readOnly &&
          <AddCircleOutlineOutlinedIcon className={classes.addIcon} onClick={() => addFood(action)} />
        }
      </Typography>
      <FoodList
        foods={myDiet.foods && myDiet.foods.filter((f) => f.restriction === action)}
        diet={myDiet}
        readOnly={readOnly}
      />
    </Paper>
  );
};

CategoryFoodList.propTypes = {
  myDiet: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.shape().isRequired,
  action: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
};

CategoryFoodList.defaultProps = {
  readOnly: false
};

export default CategoryFoodList;