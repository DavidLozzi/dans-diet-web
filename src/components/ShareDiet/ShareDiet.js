import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CONFIG from 'config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { actions as dietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import { Box, Typography, TextField, Button, makeStyles, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    '& Button': {
      marginTop: theme.spacing()
    }
  }
}));

const ShareDiet = ({ diet, onShare, onUnshare, onClose }) => {
  const notSharedText = 'Not shared, click below';
  const [shareUrl, setShareUrl] = useState(notSharedText);
  const [urlCopied, setUrlCopied] = useState(false);
  const loading = useSelector((state) => state[dietName].sharing.loading);
  const dispatch = useDispatch();
  const classes = useStyles();


  const getShareUrl = `${window.location.origin}${CONFIG.UI_URL.VIEW(diet.shareId)}`;

  useEffect(() => {
    if (diet && diet.isShared) {
      setShareUrl(getShareUrl);
    }
  }, [diet, getShareUrl]);

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    setShareUrl(`${loading ? 'Loading...' : diet.isShared ? getShareUrl : notSharedText}`);
  }, [loading, getShareUrl, diet]);

  const shareDiet = async () => {
    if (!diet.isShared) {
      dispatch(dietActions.shareDiet(diet));
      if (onShare) { onShare(); }
    } else {
      dispatch(dietActions.unshareDiet(diet));
      setShareUrl(notSharedText);
      if (onUnshare) { onUnshare(); }
    }
  };

  const close = () => {
    if (onClose) { onClose(); }
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h5">Share Your Diet: {diet.title}</Typography>
      <div>Sharing your diet will allow anyone you share the URL with to 
        view your diet.
      </div>
      <TextField
        id="share-url"
        label="Share Url"
        margin="normal"
        value={shareUrl}
        fullWidth
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboard
                text={shareUrl}
                onCopy={() => setUrlCopied(true)}
              >
                <Button disabled={!diet.isShared}>{urlCopied ? 'Copied' : 'Copy'}</Button>
              </CopyToClipboard>
            </InputAdornment>
          )
        }}
      />
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={shareDiet}
      >
        {diet.isShared ? 'Unshare' : 'Share'}
      </Button>
      <Button
        color="secondary"
        fullWidth
        onClick={close}
      >
        Close
      </Button>
    </Box>
  );
};

ShareDiet.propTypes = {
  diet: PropTypes.shape().isRequired,
  onShare: PropTypes.func,
  onUnshare: PropTypes.func,
  onClose: PropTypes.func,
};

ShareDiet.defaultProps = {
  onShare: () => { },
  onUnshare: () => { },
  onClose: () => { }
};

export default ShareDiet;