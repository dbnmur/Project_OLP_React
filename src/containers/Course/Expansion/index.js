import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Assignment';
import Add from 'material-ui-icons/Add';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import MoreVert from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import axios from 'axios';
import { connect } from 'react-redux';

import ModuleDeleteDialog from '../ModuleDeleteDialog';

class Expansion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      open: false,
      name: '',
      description: '',
      buttonDisabled: false,
      menu: null,
      moduleDelete: false
    };

    this.onClickPost = this.onClickPost.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleModuleDeleteClose = this.handleModuleDeleteClose.bind(this);
    this.onModuleDeleteConfirm = this.onModuleDeleteConfirm.bind(this);
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
  onClickDelete(recordId) {
    axios
      .delete(`/api/records/${recordId}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Create new record
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, buttonDisabled: false });
  };

  onClickPost() {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    const postData = {
      description: this.state.description,
      name: this.state.name,
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

  render() {
    const { menu } = this.state;
    return (
      <div>
        <ExpansionPanel key={this.props.index}>
          <ExpansionPanelSummary>
            <div style={{ width: '100%', padding: '0' }}>
              <Typography>
                {this.props.title}
                {this.props.isTeacher && (
                  <IconButton
                    style={{ float: 'right' }}
                    aria-owns={menu ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenuClick}>
                    <MoreVert />
                  </IconButton>
                )}
              </Typography>
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
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                    {this.props.isTeacher && (
                      <div>
                        <IconButton>
                          <ModeEdit
                            color="primary"
                            style={{ marginLeft: '5px' }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            this.onClickDelete(item.recordId);
                          }}>
                          <Delete color="secondary" />
                        </IconButton>
                      </div>
                    )}
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Add a new record to {this.props.title}
          </DialogTitle>
          <DialogContent style={{ width: '500px' }}>
            <DialogContentText>
              To add a new record, fill the form below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Record title"
              type="text"
              onChange={e => {
                e.preventDefault();
                this.setState({ name: e.target.value });
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              id="title"
              multiline
              rows={5}
              label="Record description"
              type="text"
              onChange={e => {
                e.preventDefault();
                this.setState({ description: e.target.value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.buttonDisabled}
              onClick={this.onClickPost}
              color="primary">
              Add record
            </Button>
          </DialogActions>
        </Dialog>
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
