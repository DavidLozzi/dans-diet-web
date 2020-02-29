import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiBarleyOff } from '@mdi/js';

const RestrictedIcon = ({ className }) => (
  <Icon path={mdiBarleyOff} size={1} className={className} />
);

RestrictedIcon.propTypes = {
  className: PropTypes.shape()
};

RestrictedIcon.defaultProps = {
  className: null
};

export default RestrictedIcon;