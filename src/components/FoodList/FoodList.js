import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash.groupby';
import { makeStyles, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CONFIG from 'config';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0
  },
  category: {
    backgroundColor: '#EEEEEE',
    padding: theme.spacing(),
  },
  food: {
    padding: theme.spacing(),
    border: '1px solid #aaa'
  }
}));


const FoodList = ({
  foods, onEdit, onManage
}) => {
  const classes = useStyles();
  const groupedFoods = groupBy(foods, 'category');

  return (
    <List
    >
      {
        Object.keys(groupedFoods).map((key) => {
          const category = groupedFoods[key];
          return (
            <>
              <ListItem
                className={classes.category}
              >
                <ListItemText
                  primary={key}
                />
              </ListItem>
              <Collapse in>
                <List component="div" disablePadding>
                  {category.map((food) => (
                    <ListItem
                      key={food._id}
                      className={classes.list}
                    >
                      <ListItemText
                        primary={food.name}
                        className={classes.food}
                      />
                    </ListItem>
                  )
                  )}
                </List>
              </Collapse>
            </>
          );
        }
        )
      }

    </List>
  );
};

FoodList.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape),
  onEdit: PropTypes.func,
  onManage: PropTypes.func
};

FoodList.defaultProps = {
  foods: [],
  onEdit: (food) => { console.log(`Edit not defined. ${food}`); },
  onManage: () => { }
};

export default FoodList;