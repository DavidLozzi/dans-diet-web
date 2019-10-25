import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import { Box, Typography, TextField, Button, makeStyles, Dialog, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';

export const actions = {
  add: 'Add',
  edit: 'Edit'
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10
  },
}));

const ManageDietDetail = ({ action, diet, onSave, onCancel, onDelete }) => {
  const [detailTitle, setDetailTitle] = useState(diet.title);
  const [detailDesc, setDetailDesc] = useState(diet.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const loading = useSelector((state) => state[dietName].loading);
  const dispatch = useDispatch();
  const classes = useStyles();
  const existingDiet = (diet._id);

  const pressedEnter = (event) => {
    if (event.keyCode === 13) {
      // ();
    }
  };

  const clearForm = () => {
    setDetailTitle('');
    setDetailDesc('');
  };

  const saveDetails = () => {
    if (existingDiet) {
      const updatedDiet = { ...diet, title: detailTitle, description: detailDesc };
      dispatch(dietActions.updateDiet(updatedDiet));
    } else {
      dispatch(dietActions.saveDiet(detailTitle, detailDesc));
    }
    clearForm();
    if (onSave) { onSave(); }
  };

  const cancel = () => {
    clearForm();
    if (onCancel) { onCancel(); }
  };

  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm);
  };

  const deleteDiet = () => {
    clearForm();
    dispatch(dietActions.deleteDiet(diet._id));
    toggleDeleteConfirm();
    if (onDelete) onDelete();
  };

  return (
    <Box>
      <Typography variant="h5">{action} Diet</Typography>
      <TextField
        id="diet-title"
        label="Title *"
        margin="normal"
        value={detailTitle}
        onChange={(e) => setDetailTitle(e.target.value)}
        onKeyDown={pressedEnter}
        fullWidth
        autoFocus
      />
      <TextField
        id="diet-desc"
        label="Description *"
        margin="normal"
        value={detailDesc}
        onChange={(e) => setDetailDesc(e.target.value)}
        onKeyDown={pressedEnter}
        fullWidth
        multiline
        rowsMax="4"
      />
      <Button
        color="primary"
        fullWidth
        variant="contained"
        className={classes.button}
        onClick={saveDetails}
      >
        {action} Diet {loading}
      </Button>
      <Button
        color="secondary"
        fullWidth
        onClick={cancel}
      >
        Cancel
      </Button>
      {existingDiet &&
        (
          <>
            <Button
              color="secondary"
              fullWidth
              onClick={toggleDeleteConfirm}
            >
              Delete
            </Button>
            <Dialog open={showDeleteConfirm} onBackdropClick={toggleDeleteConfirm}>
              <DialogContent>
                <DialogContentText>
                  Are you sure that you want to delete this diet? This diet along with all items
                  within this diet will be permanently deleted. There is no undo option.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleDeleteConfirm} color="primary">
                  No
                </Button>
                <Button onClick={deleteDiet} color="secondary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }
    </Box>
  );
};

ManageDietDetail.propTypes = {
  action: PropTypes.string.isRequired,
  diet: PropTypes.shape(),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};

ManageDietDetail.defaultProps = {
  diet: { title: '', description: '', _id: null },
  onSave: () => { },
  onCancel: () => { },
  onDelete: () => { }
};

export default ManageDietDetail;