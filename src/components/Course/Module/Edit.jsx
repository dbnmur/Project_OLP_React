import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class CourseModuleEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };

    this.onDialogOpen = this.onDialogOpen.bind(this);
  }

  onDialogOpen() {
    this.setState({
      name: this.props.moduleName
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        onEnter={this.onDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {`Edit ${this.props.moduleName} module`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Update module title
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Module title"
            type="text"
            value={this.state.name}
            onChange={e => {
              e.preventDefault();
              this.setState({ name: e.target.value });
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.props.onConfirm(this.state.name);
            }}
            color="primary"
            autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CourseModuleEdit;
