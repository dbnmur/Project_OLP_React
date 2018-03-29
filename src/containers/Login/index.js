import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import RoleSelect from './Form/RoleSelect';

import './index.css';

const Login = () => (
  <Grid container spacing={24} className="fullWidth">
    <Grid style={{ textAlign: 'center', width: '100%' }} item md={6}>
      <h1>Login</h1>
      <form className="loginForm" autoComplete="off">
        <TextField id="email" fullWidth label="Email" margin="normal" />
        <TextField
          id="login-password-input"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button style={{ margin: '.67em 0' }} variant="raised" color="primary">
          Log in
        </Button>
      </form>
    </Grid>
    <Grid style={{ textAlign: 'center', width: '100%' }} item md={6}>
      <h1>Register</h1>
      <form className="loginForm" autoComplete="off">
        <TextField
          id="firstname"
          fullWidth
          label="First Name"
          margin="normal"
        />
        <TextField
          id="secondName"
          fullWidth
          label="Second Name"
          margin="normal"
        />
        <TextField id="registerEmail" fullWidth label="Email" margin="normal" />
        <RoleSelect />
        <TextField
          id="register-password-input"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          id="register-password-input-repeat"
          label="Repeat password"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button style={{ margin: '.67em 0' }} variant="raised" color="primary">
          Register
        </Button>
      </form>
    </Grid>
  </Grid>
);

export default Login;
