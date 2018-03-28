import React from 'react';
import Grid from 'material-ui/Grid';

import MyCard from './MyCard';

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
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: courses
    };
  }
  render() {
    const { courses } = this.state;
    return (
      <Grid container spacing={8} style={{ width: '100%', marginTop: '25px' }}>
        <Grid item md={12}>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ width: '100%' }}>
            <Grid item>
              <h1 style={{ marginBottom: '45px' }}>My courses</h1>
            </Grid>
          </Grid>
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
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
