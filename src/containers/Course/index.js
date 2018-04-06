import React from 'react';
import Grid from 'material-ui/Grid';

import Chat from '../Chat';

class Course extends React.Component {
  render() {
    return (
      <Grid container spacing={10} style={{ width: '100%' }} justify="center">
        <Grid item md={5}>
          <h1>Web Design</h1>
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
