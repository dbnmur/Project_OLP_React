import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import KeyBoardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import axios from 'axios';

import Chat from '../Chat';
import Expansion from './Expansion';

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: [],
      course: {},
      newModuleName: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleNewModuleClick = this.handleNewModuleClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
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
      .then(res => {})
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

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`/api/courses/${params.courseid}`).then(res => {
      this.setState({ course: res.data });
    });

    axios.get('/api/modules').then(res => {
      this.setState({ modules: res.data });
    });
  }

  render() {
    console.log(this.state.course);
    return (
      <Grid container spacing={8} style={{ width: '100%' }} justify="center">
        <Grid item md={5} sm={12} style={{ width: '100%' }}>
          <Grid
            container
            spacing={8}
            style={{ width: '100%' }}
            justify="flex-end"
            alignItems="center">
            <Grid item md={6} sm={6}>
              <h1>{this.state.course.name}</h1>
            </Grid>
            <Grid item md={6} sm={6}>
              <Tooltip title="Add new module">
                <Button
                  style={{ float: 'right' }}
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
                style={{ left: '-350px' }}
                open={Boolean(this.state.menuParent)}
                onClose={this.handleMenuClose}
                anchorEl={this.state.menuParent}>
                <MenuItem>
                  <TextField
                    id="name"
                    label="Module name"
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
            </Grid>
          </Grid>
          {this.state.modules.map((el, index) => {
            return (
              <Expansion
                expanded={el.expanded}
                key={index}
                title={el.name}
                items={el.items}
              />
            );
          })}
        </Grid>
        <Grid item md={5} sm={12} style={{ height: '100%' }}>
          <h1>Chat</h1>
          <Chat />
        </Grid>
      </Grid>
    );
  }
}

export default Course;
