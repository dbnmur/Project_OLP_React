import React from 'react';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

import MyCard from './MyCard';
import FloatButton from './FloatButton';

const courses = [
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    title: 'Web Design',
    instructor: 'Auksinis kardas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: courses,
      isInstructor: false
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { courses } = this.state;
    return (
      <Grid container spacing={8} style={{ width: '100%', marginTop: '25px' }}>
        <FormGroup row style={{ marginLeft: '45px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isInstructor}
                onChange={this.handleChange('isInstructor')}
                value="isInstructor"
              />
            }
            label="Instructor"
          />
        </FormGroup>
        <Grid item md={12}>
          {/* Grid for title */}
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ width: '100%' }}>
            <Grid item>
              <h1 style={{ marginBottom: '45px' }}>My courses</h1>
            </Grid>
          </Grid>
          {/* Grid for courses */}
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={24}
            style={{ width: '100%' }}>
            {courses.map(el => {
              return (
                <Grid item>
                  <MyCard
                    title={el.title}
                    instructor={el.instructor}
                    description={el.description}
                  />
                </Grid>
              );
            })}
            {/* Grid for add button */}
          </Grid>
          {this.state.isInstructor && (
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              style={{ marginTop: '25px' }}>
              <Grid item>
                <FloatButton />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
