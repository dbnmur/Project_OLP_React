import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
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
import axios from 'axios';

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
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{this.props.title}</Typography>
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
                  </ListItem>
                );
              })}
              <ListItem button dense onClick={this.handleClickOpen}>
                <ListItemIcon>
                  <Add style={{ margin: '0 auto' }} />
                </ListItemIcon>
              </ListItem>
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

export default Expansion;
