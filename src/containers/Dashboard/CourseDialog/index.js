import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import axios from 'axios';
import { connect } from 'react-redux';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';
import { addChatBot } from '../../../modules/actions';

class CourseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isError: false,
      errorMessage: ''
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/chatbots')
      .then(response => {
        response.data.forEach(el => {
          this.props.onBotsGet(addChatBot(el));
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

const mapDispatchToProps = dispatch => {
  return {
    onBotsGet: bot => {
      dispatch(addChatBot(bot));
    }
  };
};

export default connect(null, mapDispatchToProps)(CourseDialog);
