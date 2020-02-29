import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import history from 'redux/history';

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
    bottom: theme.spacing(2),
    left: theme.spacing(3)
  }
})
);

const TopNavMenu = ({
  open, closeMenu, onClose
}) => {
  const classes = useStyles();
  const menu = [
    {
      label: 'My Diets',
      url: CONFIG.UI_URL.MY_DIETS
    },
    {
      label: 'View a Diet',
      url: CONFIG.UI_URL.VIEWDIET
    }
  ];

  const goToPage = (url) => {
    history.push(url);
  };

  const copyright = () => (
    <Typography variant="caption" color="textSecondary" align="center" className={classes.copyright}>
      {parse('Copyright &copy; ')}
      {` ${new Date().getFullYear()} `}
      <Link color="inherit" href={CONFIG.EXTERNAL_LINKS.COPYRIGHT} target="_blank">
        David Lozzi
      </Link>
    </Typography>
  );

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={closeMenu}
      onKeyDown={closeMenu}
    >
      <List>
        {menu.map((item) => (
          <ListItem button key={item.url} onClick={() => goToPage(item.url)}>
            {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
            <ListItemText primary={item.label} />
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