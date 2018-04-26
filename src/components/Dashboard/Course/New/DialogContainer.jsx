import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import CourseNewDialog from './Dialog';
import {
  toggleCourseDialog,
  addChatBot,
  registerTitle,
  registerDescription,
  registerChatBot
} from '../../../../modules/actions';

class CourseNewDialogContainer extends React.Component {
  constructor(props) {
    super(props);

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
      <CourseNewDialog
        open={this.props.open}
        handleClose={this.handleClose}
        chatBots={this.props.chatBots}
        handleOpen={this.handleClickOpen}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.newCourse.open,
    chatBots: state.newCourse.chatBots
  };
};

// TODO: you probably don't need this
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

export default connect(mapStateToProps, mapDispatchToProps)(
  CourseNewDialogContainer
);
