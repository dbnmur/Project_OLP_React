import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class CourseRecordAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: '',
      exercise: false,
      answer: ''
    };

    this.onDialogOpen = this.onDialogOpen.bind(this);
    this.onDialogExit = this.onDialogExit.bind(this);
  }

  onDialogOpen() {
    this.setState({
      name: this.props.record.name,
      description: this.props.record.description
    });
  }

  onDialogExit() {
    this.setState({ exercise: false, answer: '' });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      open,
      onClose,
      record,
      action,
      title,
      children,
      onConfirm,
      buttonDisabled
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        onEnter={this.onDialogOpen}
        onExit={this.onDialogExit}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {action === 'create'
            ? `Add a new record to ${title}`
            : `Update ${record.name} record`}
        </DialogTitle>
        <DialogContent style={{ width: '500px' }}>
          <DialogContentText>
            {action === 'create'
              ? `To add a new record, fill the form below.`
              : `To update this record, fill the form below.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Record title"
            type="text"
            value={this.state.name || ''}
            onChange={e => {
              e.preventDefault();
              this.setState({ name: e.target.value });
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            multiline
            rows={5}
            label="Record description"
            type="text"
            value={this.state.description || ''}
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
            fullWidth
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isExercise}
                  onChange={this.handleChange('exercise')}
                  value="exercise"
                />
              }
              label="Exercise"
            />
          </FormGroup>
          {this.state.exercise && (
            <TextField
              autoFocus
              margin="dense"
              id="answer"
              label="Exercise answer"
              type="text"
              value={this.state.answer || ''}
              onChange={e => {
                e.preventDefault();
                this.setState({ answer: e.target.value });
              }}
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={buttonDisabled}
            onClick={() => {
              onConfirm(
                !this.state.exercise
                  ? {
                      name: this.state.name,
                      description: this.state.description,
                      type: this.state.exercise ? 'exercise' : 'record'
                    }
                  : {
                      name: this.state.name,
                      description: this.state.description,
                      type: this.state.exercise ? 'exercise' : 'record',
                      answerRegex: this.state.answer
                    }
              );
            }}
            color="primary">
            {children}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CourseRecordAction;
