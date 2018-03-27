import React from 'react';
import Grid from 'material-ui/Grid';

const Login = () => (
  <div>
    <Grid container spacing={24}>
      <Grid item md={6}>
        <h1>Login</h1>
      </Grid>
      <Grid item md={6}>
        <h1>Register</h1>
      </Grid>
    </Grid>
  </div>
);

export default Login;
