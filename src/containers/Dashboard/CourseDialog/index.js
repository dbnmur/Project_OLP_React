import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import axios from 'axios';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';

export default class CourseDialog extends React.Component {
  state = {
    open: false,
    groups: [],
    isError: false,
    errorMessage: ''
  };

  componentDidMount() {
    axios
      .get('/api/groups')
      .then(response => {
        const groups = response.data;
        this.setState({ groups });
      })
      .catch(error => {
        this.setState({ isError: true, errorMessage: error });
      });
  }

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
            <AddCourseStepper
              groups={this.state.groups}
              myClick={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
