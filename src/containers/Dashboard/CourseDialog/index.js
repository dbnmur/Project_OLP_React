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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chatBots: [],
      isError: false,
      errorMessage: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/chatbots')
      .then(response => {
        this.setState({
          chatBots: response.data
        });
      })
      .catch(error => {
        this.setState({
          isError: true,
          errorMessage: error
        });
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
          style={{ minWidth: '500px', minHeight: '450px' }}
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
