import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import CONFIG from 'config';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  copyright: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 3
  }
})
);

const TopNavMenu = ({ open, closeMenu, onClose }) => {
  const classes = useStyles();

  const copyright = () => {
    return (
      <Typography variant="caption" color="textSecondary" align="center" className={classes.copyright}>
        {parse('Copyright &copy; ') }
        <Link color="inherit" href={CONFIG.EXTERNAL_LINKS.COPYRIGHT} target="_blank">
          David Lozzi
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    );
  };


  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={closeMenu}
      onKeyDown={closeMenu}
    >
      <List>
        {['My Diet', 'Share Diet', 'View Diet'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About', 'Support'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {copyright()}
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} onBackdropClick={closeMenu}>
      {sideList('left')}
    </Drawer>
  );
};

TopNavMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

TopNavMenu.defaultProps = {
  onClose: () => { }
};

export default TopNavMenu;