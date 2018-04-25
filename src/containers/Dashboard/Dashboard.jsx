import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import { connect } from 'react-redux';

import CourseBox from './Course/Course';
import CourseNewDialog from './Course/New/Dialog';
import { addCourse } from '../../modules/actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstructor: true,
      isLoading: true,
      isError: false,
      errorMessage: ''
    };

    this.getCoursesFromDatabaseToState = this.getCoursesFromDatabaseToState.bind(
      this
    );
  }

  componentDidMount() {
    this.getCoursesFromDatabaseToState();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.courses !== nextState.courses;
  }

  getCoursesFromDatabaseToState() {
    if (this.props.courses.length > 0) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 750);
    } else {
      axios.get('/api/courses').then(response => {
        response.data.forEach(el => {
          this.props.onCourseGet(el);
        });
        this.setState({ isLoading: false });
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
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
        {this.state.isLoading ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ width: '100%' }}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : this.props.courses.length ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ width: '100%' }}>
            {this.props.courses.map((el, index) => {
              return (
                <Grid item key={index}>
                  <CourseBox
                    title={el.name}
                    description={el.description}
                    id={el.courseId}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <h2 style={{ textAlign: 'center', fontWeight: '400' }}>
            There is no courses available. Create a course by clicking the
            button on the right.
          </h2>
        )}
        {this.props.courses.length < 2 && !this.state.isLoading ? (
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            style={{ marginTop: '25px', width: '100%' }}>
            <Grid item>
              <CourseNewDialog />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.newCourse.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCourseGet: course => {
      dispatch(addCourse(course));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
