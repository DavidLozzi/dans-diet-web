import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  footerText: {
    color: theme.palette.grey[500],
    fontSize: 12,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  footerLink: {
    color: theme.palette.grey[600]
  }
}));
const Footer = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.footerText}>made with love by <Link href="https://www.davidlozzi.com" target="_blank" className={classes.footerLink}>lozzi</Link></Typography>
  );
};

export default Footer;