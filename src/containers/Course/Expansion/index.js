import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Assignment';
import Add from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import MoreVert from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import axios from 'axios';
import { connect } from 'react-redux';

import ModuleDeleteDialog from '../ModuleDeleteDialog';
import RecordModule from '../RecordModule';

class Expansion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openRecordCreate: false,
      openRecordUpdate: false,
      buttonDisabled: false,
      menu: null,
      moduleDelete: false,
      selectedRecord: {}
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
  }

  componentDidMount() {
    axios.get(`/api/modules/${this.props.moduleId}`).then(res => {
      this.setState({ items: res.data.records });
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
      .delete(`/api/modules/${this.props.moduleId}`)
      .then(res => {
        this.handleModuleDeleteClose();
        this.props.onModuleDelete(this.props.moduleId);
      })
      .catch(error => {
        console.log(error);
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
      openRecordUpdate: false
    });
  };

  onClickPost(name = '', description = '') {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    const postData = {
      description: description,
      name: name,
      moduleId: this.props.moduleId
    };

    axios
      .post('/api/records', postData, axiosConfig)
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

  onClickUpdate(name = '', description = '') {
    this.setState({ buttonDisabled: true });
    console.log(this.state.selectedRecord.recordId);
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    const postData = {
      ...this.state.selectedRecord,
      description: description,
      name: name
    };

    axios
      .put(
        `/api/records/${this.state.selectedRecord.recordId}`,
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

  render() {
    const { menu } = this.state;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <div style={{ width: '100%', padding: '0' }}>
              <Typography>{this.props.name}</Typography>
              {this.props.isTeacher && (
                <IconButton
                  style={{ float: 'right' }}
                  aria-owns={menu ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuClick}>
                  <MoreVert />
                </IconButton>
              )}
              <Menu
                id="simple-menu"
                anchorEl={menu}
                open={Boolean(menu)}
                onClose={this.handleMenuClose}>
                <MenuItem onClick={this.handleMenuClose}>
                  <Button
                    onClick={() => {
                      this.setState({ moduleDelete: true });
                    }}>
                    <ModeEdit color="primary" />
                    <Typography style={{ padding: '10px' }}>
                      Edit module
                    </Typography>
                  </Button>
                </MenuItem>
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
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List style={{ width: '100%' }}>
              {this.state.items.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <ExpansionPanel style={{ width: '100%' }}>
                      <ExpansionPanelSummary>
                        <ListItemIcon style={{ alignSelf: 'center' }}>
                          <InboxIcon />
                        </ListItemIcon>
                        <Typography style={{ alignSelf: 'center' }}>
                          {item.name}
                        </Typography>
                        {this.props.isTeacher && (
                          <div style={{ width: '100%', textAlign: 'right' }}>
                            <IconButton
                              onClick={e => {
                                this.onclickOpenRecordUpdate(e, item);
                              }}>
                              <ModeEdit
                                color="primary"
                                style={{ marginLeft: '5px' }}
                              />
                            </IconButton>
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
        <RecordModule
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordCreate}
          title={this.props.title}
          onClose={this.handleClose}
          onClick={this.onClickPost}
          record={this.state.selectedRecord}
          action="create">
          Add a new record
        </RecordModule>
        <RecordModule
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordUpdate}
          onClose={this.handleClose}
          record={this.state.selectedRecord}
          onClick={this.onClickUpdate}
          action="update">
          Update record
        </RecordModule>
        <ModuleDeleteDialog
          moduleDelete={this.state.moduleDelete}
          onClose={this.handleModuleDeleteClose}
          onConfirm={this.onModuleDeleteConfirm}
          moduleName={this.props.title}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher
  };
};

export default connect(mapStateToProps, null)(Expansion);
