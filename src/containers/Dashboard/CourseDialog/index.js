import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';

export default class CourseDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <FloatButton onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new course fill the form below
            </DialogContentText>
            <AddCourseStepper myClick={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
