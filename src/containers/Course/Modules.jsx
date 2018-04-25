import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Laptop';
import Description from 'material-ui-icons/Description';
import Add from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import MoreVert from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import axios from 'axios';
import Done from 'material-ui-icons/Done';
import { connect } from 'react-redux';
import _ from 'lodash';

import CourseModuleDelete from './Module/Delete';
import CourseModuleEdit from './Module/Edit';
import CourseRecordAction from './Record/Action';

class CourseModules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openRecordCreate: false,
      openRecordUpdate: false,
      buttonDisabled: false,
      menu: null,
      moduleDelete: false,
      moduleEdit: false,
      selectedRecord: {},
      selectedExercise: {},
      panelExpanded: false
    };

    this.onClickPost = this.onClickPost.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleModuleDeleteClose = this.handleModuleDeleteClose.bind(this);
    this.onModuleDeleteConfirm = this.onModuleDeleteConfirm.bind(this);
    this.filterRecordsAfterDeletion = this.filterRecordsAfterDeletion.bind(
      this
    );
    this.onclickOpenRecordUpdate = this.onclickOpenRecordUpdate.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onModuleUpdateConfirm = this.onModuleUpdateConfirm.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/modules/${this.props.module.moduleId}`).then(res => {
      this.setState({
        items: res.data.records
      });
    });
  }

  // Module actions menu
  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ menu: event.currentTarget });
  };

  handleMenuClose = event => {
    event.stopPropagation();
    this.setState({ menu: null });
  };

  // Delete a module by a given id
  handleModuleDeleteClose() {
    this.setState({ moduleDelete: false });
  }

  onModuleDeleteConfirm() {
    axios
      .delete(`/api/modules/${this.props.module.moduleId}`)
      .then(res => {
        this.handleModuleDeleteClose();
        this.props.onModuleDelete(this.props.module.moduleId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Update module by a given id
  onModuleUpdateConfirm(name) {
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    const postData = {
      ...this.props.module,
      name
    };

    axios
      .put(`/api/modules/${this.props.module.moduleId}`, postData, axiosConfig)
      .then(res => {
        console.log(res.data);
        this.props.onModuleUpdate(postData);
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  // Delete a record by given id
  onClickDelete = (event, recordId) => {
    event.stopPropagation();
    axios
      .delete(`/api/records/${recordId}`)
      .then(res => {
        this.filterRecordsAfterDeletion(recordId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  filterRecordsAfterDeletion(recordId) {
    let items = this.state.items.filter(item => item.recordId !== recordId);
    this.setState({ items });
  }

  // Create new record
  handleClickOpen = () => {
    this.setState({ openRecordCreate: true });
  };

  handleClose = () => {
    this.setState({
      openRecordCreate: false,
      buttonDisabled: false,
      openRecordUpdate: false,
      selectedRecord: {},
      moduleEdit: false
    });
  };

  onClickPost(record) {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };
    let postData = {};

    record.type === 'record'
      ? (postData = {
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId
        })
      : (postData = {
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId,
          answerRegex: record.answerRegex,
          isCompleted: false
        });
    axios
      .post(
        record.type === 'record' ? '/api/records' : '/api/exercises',
        postData,
        axiosConfig
      )
      .then(res => {
        this.setState(prevState => ({
          items: [...prevState.items, res.data]
        }));
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  // Update a record
  onclickOpenRecordUpdate(e, record) {
    e.stopPropagation();
    this.setState({ openRecordUpdate: true, selectedRecord: record });
  }

  onClickUpdate(record) {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    let postData = {};

    record.type === 'record'
      ? (postData = {
          ...this.state.selectedRecord,
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId
        })
      : (postData = {
          ...this.state.selectedRecord,
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId,
          answerRegex: record.answerRegex,
          isCompleted: false
        });

    axios
      .put(
        record.type === 'record'
          ? `/api/records/${this.state.selectedRecord.recordId}`
          : `/api/exercises/${this.state.selectedRecord.recordId}`,
        postData,
        axiosConfig
      )
      .then(res => {
        let tempState = this.state.items;
        tempState.forEach(el => {
          if (el.recordId === this.state.selectedRecord.recordId) {
            el.name = record.name;
            el.description = record.description;
          }
        });
        this.setState({ items: tempState });

        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  render() {
    const { menu } = this.state;
    return (
      <div style={{ paddingBottom: '10px' }}>
        {/* Module panel */}
        <ExpansionPanel style={{ width: '100%' }}>
          <ExpansionPanelSummary>
            <Typography
              style={{ width: '100%', alignSelf: 'center', fontSize: '1.5em' }}>
              {this.props.module.name}
            </Typography>
            {/* Open module action menu */}
            {this.props.isTeacher && (
              <div
                style={{
                  width: '100%',
                  textAlign: 'right',
                  padding: '0'
                }}>
                <IconButton
                  style={{ float: 'right' }}
                  aria-owns={menu ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuClick}>
                  <MoreVert />
                </IconButton>
              </div>
            )}
            {/* Module action menu */}
            <Menu
              id="simple-menu"
              anchorEl={menu}
              open={Boolean(menu)}
              onClose={this.handleMenuClose}>
              {/* Module edit */}
              <MenuItem onClick={this.handleMenuClose}>
                <Button
                  onClick={() => {
                    this.setState({ moduleEdit: true });
                  }}>
                  <ModeEdit color="primary" />
                  <Typography style={{ padding: '10px' }}>
                    Edit module
                  </Typography>
                </Button>
              </MenuItem>
              {/* Module delete */}
              <MenuItem onClick={this.handleMenuClose}>
                <Button
                  onClick={() => {
                    this.setState({ moduleDelete: true });
                  }}>
                  <Delete color="secondary" />
                  <Typography style={{ padding: '10px' }}>
                    Delete module
                  </Typography>
                </Button>
              </MenuItem>
            </Menu>
          </ExpansionPanelSummary>
          {/* Records */}
          <ExpansionPanelDetails>
            <List style={{ width: '100%' }}>
              {this.state.items.map((item, index) => {
                return (
                  <ListItem key={item.recordId} style={{ padding: '5px' }}>
                    {/* Record panel */}
                    <ExpansionPanel
                      style={{ width: '100%' }}
                      expanded={
                        _.isEmpty(this.props.botResponse)
                          ? false
                          : item.recordId ===
                            this.props.botResponse.exercise.exerciseId
                            ? true
                            : false
                      }>
                      <ExpansionPanelSummary>
                        {item.answerRegex ? (
                          <ListItemIcon style={{ alignSelf: 'center' }}>
                            {_.isEmpty(this.props.botResponse) ? (
                              <InboxIcon />
                            ) : item.recordId ===
                            this.props.botResponse.exercise.exerciseId ? (
                              this.props.botResponse.exercise.markDone ? (
                                <Done />
                              ) : (
                                <InboxIcon />
                              )
                            ) : (
                              <InboxIcon />
                            )}
                          </ListItemIcon>
                        ) : (
                          <ListItemIcon style={{ alignSelf: 'center' }}>
                            <Description />
                          </ListItemIcon>
                        )}
                        <Typography
                          style={{ alignSelf: 'center', width: '100%' }}>
                          {item.name}
                        </Typography>
                        {/* Record action buttons */}
                        {this.props.isTeacher && (
                          <div
                            style={{
                              width: '100%',
                              textAlign: 'right',
                              padding: '0'
                            }}>
                            {/* Update record */}
                            <IconButton
                              onClick={e => {
                                this.onclickOpenRecordUpdate(e, item);
                              }}>
                              <ModeEdit
                                color="primary"
                                style={{ marginLeft: '5px' }}
                              />
                            </IconButton>
                            {/* Delete record */}
                            <IconButton
                              onClick={e => {
                                this.onClickDelete(e, item.recordId);
                              }}>
                              <Delete color="secondary" />
                            </IconButton>
                          </div>
                        )}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{item.description}</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </ListItem>
                );
              })}
              {/* Add new record */}
              {this.props.isTeacher && (
                <ListItem button dense onClick={this.handleClickOpen}>
                  <ListItemIcon>
                    <Add style={{ margin: '0 auto' }} />
                  </ListItemIcon>
                </ListItem>
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* Record creation module */}
        <CourseRecordAction
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordCreate}
          title={this.props.module.name}
          onClose={this.handleClose}
          onClick={this.onClickPost}
          record={this.state.selectedRecord}
          action="create">
          Add a new record
        </CourseRecordAction>
        {/* Record update module */}
        <CourseRecordAction
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordUpdate}
          onClose={this.handleClose}
          record={this.state.selectedRecord}
          onClick={this.onClickUpdate}
          action="update">
          Update record
        </CourseRecordAction>
        {/* Module delete dialog */}
        <CourseModuleDelete
          moduleDelete={this.state.moduleDelete}
          onClose={this.handleModuleDeleteClose}
          onConfirm={this.onModuleDeleteConfirm}
          moduleName={this.props.module.name}
        />
        <CourseModuleEdit
          open={this.state.moduleEdit}
          onClose={this.handleClose}
          onConfirm={this.onModuleUpdateConfirm}
          moduleName={this.props.module.name}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher,
    botResponse: state.newCourse.botResponse
  };
};

export default connect(mapStateToProps, null)(CourseModules);
