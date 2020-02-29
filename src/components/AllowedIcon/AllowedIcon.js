import React from 'react';
import PropTypes from 'prop-types';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';

const AllowedIcon = ({ className }) => (
  <RestaurantOutlinedIcon fontSize="small" className={className} />
);

AllowedIcon.propTypes = {
  className: PropTypes.shape()
};

AllowedIcon.defaultProps = {
  className: null
};

export default AllowedIcon;