import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Grid, TextField, Select, InputLabel, MenuItem, FormControlLabel, FormControl, FormHelperText, Button, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CONFIG from 'config';
import { actions as foodActions } from 'redux/api/food/food';
import { actions as groceriesActions, name as groceriesName } from 'redux/api/groceries/groceries';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10
  },
  formControl: {
    width: '100%'
  }
}));

const ManageFoodForm = ({ diet, food, onSave, onCancel, onDone }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [myFood, setMyFood] = useState({ ...food, dietId: diet._id });
  const [action, setAction] = useState(CONFIG.OPTIONS.ADD);
  const [addMore, setAddMore] = useState(true);
  const [searchText, setSearchText] = useState('a');
  const options = useSelector((state) => state[groceriesName][searchText].options);

  useEffect(() => {
    if (food && diet.foods && food._id !== '' && food._id !== undefined) {
      setAction(CONFIG.OPTIONS.EDIT);
      setMyFood(diet.foods.filter((f) => f._id === food._id)[0]);
    }
  }, []);

  const clearForm = () => {
    setMyFood({ restriction: food.restriction, dietId: diet._id });
  };

  const saveFood = () => {
    if (myFood._id === '' || myFood._id === undefined) {
      dispatch(foodActions.addFood(myFood));
    } else {
      dispatch(foodActions.updateFood(myFood));
    }
    clearForm();
    if (onSave) onSave();
    if (!addMore) onDone();
  };

  const cancel = () => {
    clearForm();
    if (onCancel) onCancel();
  };

  const typeahead = (text) => {
    if (text) {
      dispatch(groceriesActions.search(text));
      setSearchText(text);
    }
  };

  return (
    <Grid
      container
      className={classes.root}
    >
      <Grid item xs={12} md={6}>
        <h3>{diet.title}: {action} Food</h3>
        {/* <TextField
          id=name
          label='Name of Food or Beverage'
          fullWidth
          autoFocus
          value={myFood.name}
          onChange={(e) => setMyFood({ ...myFood, name: e.target.value })}
        /> */}
        <Autocomplete
          id="name"
          onChange={(e, t) => t && setMyFood({ ...myFood, name: t.name, category: t.aisle.split(';')[0] })}
          onInputChange={(e, text) => typeahead(text)}
          options={options.sort((a, b) => -b.aisle.localeCompare(a.aisle))}
          groupBy={(option) => option.aisle}
          getOptionLabel={(option) => option.name}
          noOptionsText="Begin typing..."
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Name of Food or Beverage" value={myFood.name} fullWidth />
          )}
        />
        <TextField
          id="category"
          label="Category"
          fullWidth
          value={myFood.category}
          onChange={(e) => setMyFood({ ...myFood, category: e.target.value })}
        />
        <TextField
          id="notes"
          label="Notes"
          helperText="Comments, preparation notes, etc."
          fullWidth
          multiline
          value={myFood.notes}
          onChange={(e) => setMyFood({ ...myFood, notes: e.target.value })}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="restriction-label">Restriction</InputLabel>
          <Select
            labelid="restriction-label"
            id="restriction"
            value={myFood.restriction}
            onChange={(e) => setMyFood({ ...myFood, restriction: e.target.value })}
            fullWidth
          >
            {Object.values(CONFIG.RESTRICTIONS).map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Is this food item restricted or allowed on your diet?</FormHelperText>
        </FormControl>
        <FormControlLabel
          control={
            (
              <Switch
                checked={addMore}
                onChange={() => setAddMore(!addMore)}
                value="addMore"
                color="primary"
              />
            )
          }
          label="Add more food"
        />
      </Grid>
      <Grid container>
        <Grid item xs={5} md={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={saveFood}
          >
            {action === CONFIG.OPTIONS.ADD ? 'Add' : 'Update'} Food
          </Button>
        </Grid>
        <Grid item xs={2} md={1} />
        <Grid item xs={5} md={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={cancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

ManageFoodForm.propTypes = {
  diet: PropTypes.shape().isRequired,
  food: PropTypes.shape(),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onDone: PropTypes.func
};

ManageFoodForm.defaultProps = {
  food: {},
  onSave: () => { },
  onCancel: () => { },
  onDone: () => { }
};

export default ManageFoodForm;