import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import KeyBoardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

import Chat from '../Chat';
import Expansion from './Expansion';

class Course extends React.Component {
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
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`/api/courses/${params.courseid}`).then(res => {
      this.extractModulesFromCourse(res.data.modules);
      this.setState({ course: res.data, isLoading: false });
      console.log(res.data);
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
    return (
      <Grid container spacing={8} style={{ width: '100%' }} justify="center">
        {!this.state.isLoading ? (
          <Grid item md={5} sm={12} style={{ width: '100%' }}>
            <Grid
              container
              spacing={8}
              style={{ width: '100%' }}
              justify="flex-start"
              alignItems="center">
              <h1>{this.state.course.name}</h1>
              {this.props.isTeacher && (
                <div>
                  <Tooltip title="Add new module">
                    <Button
                      style={{ float: 'left', marginLeft: '25px' }}
                      variant="fab"
                      mini
                      color="secondary"
                      aria-label="add"
                      aria-owns={this.state.menuParent ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenuClick}>
                      <CreateNewFolder />
                    </Button>
                  </Tooltip>
                  <Menu
                    id="simple-menu"
                    style={{ left: '75px' }}
                    open={Boolean(this.state.menuParent)}
                    onClose={this.handleMenuClose}
                    anchorEl={this.state.menuParent}>
                    <MenuItem>
                      <TextField
                        id="name"
                        label="New module name"
                        margin="normal"
                        size="small"
                        onChange={this.keyPress}
                      />
                      <Button
                        variant="raised"
                        color="secondary"
                        mini
                        onClick={this.handleNewModuleClick}>
                        <KeyBoardArrowRight />
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
            {this.state.modules.map((el, index) => {
              return (
                <Expansion
                  module={{ ...el }}
                  key={el.moduleId}
                  onModuleDelete={this.updateModulesAfterDelete}
                  onModuleUpdate={this.updateModuleAfterUpdate}
                />
              );
            })}
          </Grid>
        ) : (
          <Grid item md={5}>
            <CircularProgress />
          </Grid>
        )}
        <Grid item md={5} sm={12} style={{ height: '100%' }}>
          <h1>Chat</h1>
          {_.isEmpty(this.state.course) ? (
            <Chat />
          ) : (
            <Chat link={this.state.course.chatBot.link} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher
  };
};

export default connect(mapStateToProps, null)(Course);
