import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import RoleSelect from '../Login/Form/RoleSelect';

const Registration = () => {
  return (
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
  );
};

export default Registration;
