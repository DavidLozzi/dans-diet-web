
import React from 'react';
import PropTypes from 'prop-types';
import ShareDiet from 'components/ShareDiet/ShareDiet';
import { Dialog, DialogContent } from '@material-ui/core';

const ShareDietDialog = ({ diet, onShare, onUnshare, onClose, openShareDiet, toggleShareDiet }) => {
  return (
    <Dialog open={openShareDiet} onBackdropClick={toggleShareDiet}>
      <DialogContent>
        <ShareDiet
          diet={diet}
          onShare={onShare}
          onUnshare={onUnshare}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

ShareDietDialog.propTypes = {
  onShare: PropTypes.func,
  onUnshare: PropTypes.func,
  onClose: PropTypes.func,
  diet: PropTypes.shape().isRequired,
  openShareDiet: PropTypes.bool,
  toggleShareDiet: PropTypes.func
};

ShareDietDialog.defaultProps = {
  onShare: () => {},
  onUnshare: () => {},
  onClose: () => {},
  openShareDiet: false,
  toggleShareDiet: () => {}
};

export default ShareDietDialog;