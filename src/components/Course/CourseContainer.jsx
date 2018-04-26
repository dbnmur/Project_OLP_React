import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Course from './Course';

class CourseContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: [],
      course: {},
      newModuleName: '',
      isLoading: true
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleNewModuleClick = this.handleNewModuleClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.extractModulesFromCourse = this.extractModulesFromCourse.bind(this);
    this.updateModulesAfterDelete = this.updateModulesAfterDelete.bind(this);
    this.updateModuleAfterUpdate = this.updateModuleAfterUpdate.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`/api/courses/${params.courseid}`).then(res => {
      this.extractModulesFromCourse(res.data.modules);
      this.setState({ course: res.data, isLoading: false });
    });
  }

  updateModulesAfterDelete(moduleId) {
    let items = this.state.modules.filter(item => item.moduleId !== moduleId);
    this.setState({ modules: items });
  }

  updateModuleAfterUpdate(module) {
    let tempState = this.state.modules;
    tempState.forEach(el => {
      if (el.moduleId === module.moduleId) {
        el.name = module.name;
      }
    });
    this.setState({ modules: tempState });
  }

  keyPress(e) {
    this.setState({ newModuleName: e.target.value });
  }

  handleNewModuleClick() {
    let axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    var postData = {
      courseId: this.state.course.courseId,
      description: '',
      name: this.state.newModuleName
    };

    axios
      .post('/api/modules', postData, axiosConfig)
      .then(res => {
        this.setState(prevState => ({
          modules: [...prevState.modules, res.data]
        }));
        this.handleMenuClose();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleMenuClick = event => {
    this.setState({ menuParent: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuParent: null });
  };

  extractModulesFromCourse(modules) {
    modules.forEach(el => {
      this.setState(prevState => ({
        modules: [...prevState.modules, el]
      }));
    });
  }

  render() {
    const { isLoading, course, modules, menuParent } = this.state;
    return (
      <Course
        isLoading={isLoading}
        course={course}
        isTeacher={this.props.isTeacher}
        menuParent={menuParent}
        handleMenuClick={this.handleMenuClick}
        handleMenuClose={this.handleMenuClose}
        keyPress={this.keyPress}
        handleNewModuleClick={this.handleNewModuleClick}
        modules={modules}
        moduleDelete={this.updateModulesAfterDelete}
        moduleUpdate={this.updateModuleAfterUpdate}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher
  };
};

export default connect(mapStateToProps, null)(CourseContainer);
