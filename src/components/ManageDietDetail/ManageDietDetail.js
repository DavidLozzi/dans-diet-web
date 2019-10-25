import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import { Box, Typography, TextField, Button, makeStyles } from '@material-ui/core';

export const actions = {
  add: 'Add',
  edit: 'Edit'
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10
  },
}));

const ManageDietDetail = ({ action, diet, onSave, onCancel }) => {
  const [detailTitle, setDetailTitle] = useState(diet.title);
  const [detailDesc, setDetailDesc] = useState(diet.description);
  const loading = useSelector((state) => state[dietName].loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const pressedEnter = (event) => {
    if (event.keyCode === 13) {
      // ();
    }
  };

  const saveDetails = () => {
    dispatch(dietActions.saveDiet(detailTitle, detailDesc));
    if (onSave) { onSave(); }
  };

  const cancel = () => {
    setDetailTitle('');
    setDetailDesc('');
    if (onCancel) { onCancel(); }
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
    </Box>
  );
};

ManageDietDetail.propTypes = {
  action: PropTypes.string.isRequired,
  diet: PropTypes.shape(),
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

ManageDietDetail.defaultProps = {
  diet: { title: '', description: '' },
  onSave: () => {},
  onCancel: () => {}
};

export default ManageDietDetail;