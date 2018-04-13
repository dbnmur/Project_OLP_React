import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import axios from 'axios';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';
import {
  toggleCourseDialog,
  addChatBot,
  registerTitle,
  registerDescription,
  registerChatBot
} from '../../../modules/actions';

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

  componentDidMount() {
    if (this.props.chatBots.length > 0) {
      return;
    } else {
      axios
        .get('/api/chatbots')
        .then(response => {
          response.data.forEach(el => {
            this.props.onBotsGet(el);
          });
        })
        .catch(error => {
          this.setState({
            isError: true,
            errorMessage: error
          });
        });
    }
  }

  componentWillUnmount() {}

  handleClickOpen() {
    this.props.onClose(true);
  }

  handleClose() {
    this.props.onClose(false);
    this.props.onTitleChange('');
    this.props.onDescriptionChange('');
    this.props.onChatBotChange('');
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
    open: state.newCourse.open,
    chatBots: state.newCourse.chatBots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: isOpen => {
      dispatch(toggleCourseDialog(isOpen));
    },
    onBotsGet: bot => {
      dispatch(addChatBot(bot));
    },
    onChatBotChange: chatbot => {
      dispatch(registerChatBot(chatbot));
    },
    onTitleChange: title => {
      dispatch(registerTitle(title));
    },
    onDescriptionChange: des => {
      dispatch(registerDescription(des));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDialog);
