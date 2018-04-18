import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class RecordModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: ''
    };
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
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
            defaultValue={this.props.record.name}
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
            defaultValue={this.props.record.description}
            onChange={e => {
              e.preventDefault();
              this.setState({ description: e.target.value });
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={this.props.buttonDisabled}
            onClick={() => {
              this.props.onClick(this.state.name, this.state.description);
            }}
            color="primary">
            {this.props.children}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RecordModule;
