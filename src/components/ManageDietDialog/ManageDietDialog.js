
import React from 'react';
import PropTypes from 'prop-types';
import ManageDietDetail from 'components/ManageDietDetail/ManageDietDetail';
import { Dialog, DialogContent } from '@material-ui/core';
import CONFIG from 'config';

const ManageDietDialog = ({ openDietDetails, toggleDietDetails, diet, dietDetailsAction }) => {
  return (
    <Dialog open={openDietDetails} onBackdropClick={toggleDietDetails}>
      <DialogContent>
        <ManageDietDetail
          diet={diet}
          action={dietDetailsAction}
          onSave={toggleDietDetails}
          onCancel={toggleDietDetails}
          onDelete={toggleDietDetails}
        />
      </DialogContent>
    </Dialog>
  );
};

ManageDietDialog.propTypes = {
  openDietDetails: PropTypes.bool,
  toggleDietDetails: PropTypes.func.isRequired,
  diet: PropTypes.shape(),
  dietDetailsAction: PropTypes.string
};

ManageDietDialog.defaultProps = {
  openDietDetails: false,
  diet: {},
  dietDetailsAction: CONFIG.OPTIONS.ADD
};

export default ManageDietDialog;