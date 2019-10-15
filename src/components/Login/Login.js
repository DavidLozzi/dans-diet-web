import React, { useState } from 'react';
import history from 'redux/history';
import parse from 'html-react-parser';
import { Avatar, makeStyles, Typography, TextField, Button, Grid, Chip, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import CONFIG from 'config';
import { loginUser as loginUserUtil } from 'utils/accountUtil/accountUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?food)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [notAllowed, setNotAllowed] = useState('');

  const loginUser = async () => {
    const resp = await loginUserUtil(loginEmail, loginPassword);
    if (resp) {
      setLoginEmail('');
      setLoginPassword('');
      history.push(CONFIG.UI_URL.LANDING);
    } else {
      console.error('NOT ALLOWED');
      setNotAllowed('Invalid login');
    }
  };

  const pressedEnter = (event) => {
    if (event.keyCode === 13) {
      loginUser();
    }
  };

  const handleEmailChange = (event) => {
    setNotAllowed('');
    setLoginEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNotAllowed('');
    setLoginPassword(event.target.value);
  };

  const handleCloseChip = () => {
    setNotAllowed('');
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${parse(CONFIG.APP_NAME)} Sign In`}
          </Typography>
          <TextField
            id="login-email"
            label="Email *"
            margin="normal"
            value={loginEmail}
            onChange={handleEmailChange}
            onKeyDown={pressedEnter}
            fullWidth
            autoFocus
            autoComplete="email"
          />
          <TextField
            id="login-password"
            label="Password *"
            margin="normal"
            type="password"
            autoComplete="current-password"
            value={loginPassword}
            onChange={handlePasswordChange}
            onKeyDown={pressedEnter}
            fullWidth
          />
          {
            notAllowed !== ''
            && (
              <Grid item xs={12}>
                <Chip
                  label={notAllowed}
                  onDelete={handleCloseChip}
                  color="secondary"
                />
              </Grid>
            )
          }
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={loginUser}
            fullWidth
          >
            Sign In
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;