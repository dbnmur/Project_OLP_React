import React from 'react';
import Grid from 'material-ui/Grid';
import axios from 'axios';

import CourseBox from './CourseBox';
import CourseDialog from './CourseDialog';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isInstructor: true
    };

    this.getCoursesFromDatabase = this.getCoursesFromDatabase.bind(this);
    this.getCoursesFromDatabase();
  }

  getCoursesFromDatabase() {
    axios.get('/api/courses').then(response => {
      this.setState(prevState => ({
        ...prevState,
        courses: response.data
      }));
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { courses } = this.state;
    return (
      <Grid item md={12} sx={12} sm={12}>
        {/* Grid for title */}
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ width: '100%' }}>
          <Grid item>
            <h1 style={{ marginBottom: '45px' }}>Courses</h1>
          </Grid>
        </Grid>
        {/* Grid for courses */}
        {this.state.courses.length ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ width: '100%' }}>
            {courses.map((el, index) => {
              return (
                <Grid item key={index}>
                  <CourseBox title={el.name} description={el.description} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <h2 style={{ textAlign: 'center' }}>
            There is no courses available. Create course by clicking the button
            on the right.
          </h2>
        )}
        {this.state.courses.length < 2 ? (
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            style={{ marginTop: '25px', width: '100%' }}>
            <Grid item>
              <CourseDialog />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    );
  }
}

export default Dashboard;
