import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Chat from '../Chat';

class Course extends React.Component {
  render() {
    return (
      <Grid container spacing={8} style={{ width: '100%' }} justify="center">
        <Grid item md={5}>
          <h1>Web Design</h1>
          <Paper elevation={4} style={{ width: '80%', padding: '15px' }}>
            <Typography variant="headline" component="h3">
              This is a sheet of paper.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={5} style={{ height: '100%' }}>
          <h3>Chat</h3>
          <Chat />
        </Grid>
      </Grid>
    );
  }
}

export default Course;
