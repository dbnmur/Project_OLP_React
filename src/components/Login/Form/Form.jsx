import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import './index.css';

const Login = () => {
  return (
    <Grid
      container
      spacing={24}
      className="fullWidth"
      style={{ height: '100%' }}
      alignContent="center"
      justify="center">
      <Grid
        style={{ textAlign: 'center', width: '100%', height: '100%' }}
        item
        md={6}>
        <h1>Login</h1>
        <form className="loginForm" autoComplete="off" style={{ width: '80%' }}>
          <TextField id="email" fullWidth label="Email" margin="normal" />
          <TextField
            id="login-password-input"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/dashboard">
            <Button
              style={{ margin: '.67em 0', width: '100%', marginTop: '25px' }}
              variant="raised"
              color="primary">
              Log in
            </Button>
          </Link>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
