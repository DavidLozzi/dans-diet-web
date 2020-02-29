import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import history from 'redux/history';
import groupBy from 'lodash.groupby';
import { makeStyles, Button, Collapse, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogContent, DialogActions, DialogContentText, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CONFIG from 'config';
import { actions as foodActions } from 'redux/api/food/food';
import { actions as dietActions } from 'redux/api/myDiet/myDiet';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0
  },
  categoryWrapper: {
    // border: '1px solid',
    // borderColor: theme.palette.primary.main,
    // borderTop: 0,
    marginBottom: theme.spacing(),
    // borderRadius: '10px 10px 0px 0px'
    backgroundColor: '#fff'
  },
  category: {
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: theme.spacing()
    // borderRadius: '10px 10px 0px 0px'
  },
  categoryText: {
    fontWeight: 700
  },
  list: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`
  },
  icon: {
    marginLeft: theme.spacing()
  },
  editIcon: {
    color: theme.palette.grey[400]
  }
}));


const FoodList = ({
  foods, diet, onEdit, onDelete, readOnly
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const groupedFoods = groupBy(foods, 'category');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const editFood = (foodId) => {
    if (onEdit) onEdit();
    history.push(`${CONFIG.UI_URL.FOOD(diet._id)}?foodId=${foodId}`);
  };

  const deleteFood = () => {
    if (onDelete) onDelete();
    dispatch(foodActions.deleteFood(selectedFood._id));
    dispatch(dietActions.getDiet(selectedFood.dietId));
    setSelectedFood(null);
  };

  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm);
  };

  return (
    <>
      <List>
        {
          Object.keys(groupedFoods).map((key) => {
            const category = groupedFoods[key];
            return (
              <div key={key} className={classes.categoryWrapper}>
                <ListItem
                  className={classes.category}
                >
                  <Typography className={classes.categoryText}>{key}</Typography>
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
                        {!readOnly &&
                          (
                            <ListItemSecondaryAction>
                              <IconButton edge="end" onClick={() => editFood(food._id)}>
                                <EditIcon className={classes.editIcon} />
                              </IconButton>
                              <IconButton
                                edge="end"
                                onClick={() => {
                                  setSelectedFood(food);
                                  setShowDeleteConfirm(true);
                                }}
                                className={classes.icon}
                              >
                                <DeleteIcon />
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
      {selectedFood &&
        (
          <Dialog open={showDeleteConfirm} onBackdropClick={toggleDeleteConfirm}>
            <DialogContent>
              <DialogContentText>
                Are you sure that you want to delete the {selectedFood.restriction.toLowerCase()} food: {selectedFood.name}?
                This food will be permanently deleted. There is no undo option.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleDeleteConfirm} color="primary">
                No
              </Button>
              <Button onClick={deleteFood} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </>
  );
};

FoodList.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape),
  diet: PropTypes.shape().isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  readOnly: PropTypes.bool
};

FoodList.defaultProps = {
  foods: [],
  onEdit: null,
  onDelete: null,
  readOnly: false
};

export default FoodList;