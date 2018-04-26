import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { addCourse } from '../../modules/actions';
import Dashboard from './Dashboard';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <Dashboard items={this.props.courses} isLoading={this.state.isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
