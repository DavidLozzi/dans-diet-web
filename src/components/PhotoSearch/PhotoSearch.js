import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles, Box, Typography, TextField, Grid } from '@material-ui/core';
import { actions as photoActions, name as photoName } from 'redux/api/photos/photos';
import { actions as dietActions } from 'redux/api/myDiet/myDiet';
import { debounce } from 'debounce';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh'
  },
  thumbnail: {
    display: 'inline-block',
    height: '110px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
}));

const PhotoSearch = ({ diet, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const photos = useSelector((state) => state[photoName].photos);

  const search = debounce((text) => {
    if (text && text.length > 2) {
      console.log('searching for ', text);
      dispatch(photoActions.search(text));
    }
  }, 300);

  const selectPhoto = (photo) => {
    if (onSelect) onSelect(photo);

    const updatedDiet = { ...diet, photo };
    dispatch(dietActions.updateDiet(updatedDiet));
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5">Photo Search</Typography>
      <TextField
        id="keyword"
        label="Seach term"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => search(e.target.value)}
        fullWidth
        autoFocus
      />
      <Grid container>
        {
          photos && photos.map((photo) => (
            <Grid
              item
              key={photo.id}
              xs={4}
              className={classes.thumbnail}
              style={{
                backgroundImage: `url(${photo.thumbnailUrl})`
              }}
              onClick={() => selectPhoto(photo)}
            />
          ))
        }
      </Grid>
    </Box>
  );
};

PhotoSearch.propTypes = {
  diet: PropTypes.shape().isRequired,
  onSelect: PropTypes.func
};

PhotoSearch.defaultProps = {
  onSelect: null
};

export default PhotoSearch;