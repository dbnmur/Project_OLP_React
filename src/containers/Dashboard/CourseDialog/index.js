import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { connect } from 'react-redux';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';
import { toggleCourseDialog } from '../../../modules/actions';

class CourseDialog extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isError: false,
      errorMessage: ''
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.props.onClose(true);
  }

  handleClose() {
    this.props.onClose(false);
  }

  render() {
    return (
      <div>
        <FloatButton onClick={this.handleClickOpen} />
        <Dialog
          open={this.props.open}
          style={{ minWidth: '500px', height: '600px' }}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new course fill the form below
            </DialogContentText>
            <AddCourseStepper
              groups={this.state.chatBots}
              myClick={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.newCourse.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: isOpen => {
      dispatch(toggleCourseDialog(isOpen));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDialog);
