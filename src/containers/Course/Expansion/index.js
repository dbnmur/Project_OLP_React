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
import axios from 'axios';
import { connect } from 'react-redux';

class Expansion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      open: false,
      name: '',
      description: ''
    };

    this.onClickPost = this.onClickPost.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/modules/${this.props.moduleId}`).then(res => {
      this.setState({ items: res.data.records });
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  onClickPost() {
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
    return (
      <div>
        <ExpansionPanel key={this.props.index}>
          <ExpansionPanelSummary>
            <div>
              <Typography>{this.props.title}</Typography>
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
            <Button onClick={this.onClickPost} color="primary">
              Add record
            </Button>
          </DialogActions>
        </Dialog>
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
