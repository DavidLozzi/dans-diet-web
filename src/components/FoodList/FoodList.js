import React from 'react';
import PropTypes from 'prop-types';
import history from 'redux/history';
import groupBy from 'lodash.groupby';
import { makeStyles, Collapse, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
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
  list: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`
  }
}));


const FoodList = ({
  foods, diet, onEdit, readonly
}) => {
  const classes = useStyles();
  const groupedFoods = groupBy(foods, 'category');

  const editFood = (foodId) => {
    if (onEdit) onEdit()
    history.push(`${CONFIG.UI_URL.FOOD(diet._id)}?foodId=${foodId}`);
  };

  return (
    <List
    >
      {
        Object.keys(groupedFoods).map((key) => {
          const category = groupedFoods[key];
          return (
            <div key={key}>
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
                        secondary={food.notes}
                      />
                      {!readonly &&
                        (
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => editFood(food._id)}>
                              <EditIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )
                      }
                    </ListItem>
                  )
                  )}
                </List>
              </Collapse>
            </div>
          );
        }
        )
      }

    </List>
  );
};

FoodList.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape),
  diet: PropTypes.shape().isRequired,
  onEdit: PropTypes.func,
  readonly: PropTypes.bool
};

FoodList.defaultProps = {
  foods: [],
  onEdit: (food) => { console.log(`Edit not defined. ${food}`); },
  readonly: false
};

export default FoodList;