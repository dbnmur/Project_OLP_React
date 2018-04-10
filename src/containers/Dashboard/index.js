import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import { connect } from 'react-redux';

import CourseBox from './CourseBox';
import CourseDialog from './CourseDialog';
import { addChatBot, addCourse } from '../../modules/actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstructor: true,
      isLoading: true,
      isError: false,
      errorMessage: ''
    };

    this.getCoursesFromDatabase = this.getCoursesFromDatabase.bind(this);
    this.getCoursesFromDatabase();
  }

  componentDidMount() {
    axios
      .get('/api/chatbots')
      .then(response => {
        response.data.forEach(el => {
          this.props.onBotsGet(el);
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({
          isError: true,
          errorMessage: error
        });
      });
  }

  getCoursesFromDatabase() {
    axios.get('/api/courses').then(response => {
      response.data.forEach(el => {
        this.props.onCourseGet(el);
      });
    });
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
                  <CourseBox title={el.name} description={el.description} />
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

const mapStateToProps = state => {
  return {
    courses: state.newCourse.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBotsGet: bot => {
      dispatch(addChatBot(bot));
    },
    onCourseGet: course => {
      dispatch(addCourse(course));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
