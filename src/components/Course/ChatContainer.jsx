import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { catchBotResponse } from '../../modules/actions';
import CourseChat from './Chat';

class CourseChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 1,
          message: 'Hey, what are you up to?'
        }
      ],
      session: ''
    };

    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      let newMessage = {
        id: 0,
        message: e.target.value
      };

      let axiosConfig = {
        headers: {
          'content-type': 'application/json-patch+json',
          sessionId: this.state.session
        }
      };

      var postData = {
        message: e.target.value
      };

      axios
        .post(this.props.link, postData, axiosConfig)
        .then(res => {
          this.props.onChatBotResponse(res.data);
          this.setState(prevState => ({
            messages: [
              ...prevState.messages,
              newMessage,
              {
                id: 1,
                message: `${res.data.chatbotResponse}`
              }
            ],
            session: res.data.sessionId
          }));
        })
        .catch(err => {
          console.log(err);
        });

      e.target.value = '';
    }
  }
  render() {
    return (
      <CourseChat messages={this.state.messages} keyPress={this.keyPress} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChatBotResponse: response => {
      dispatch(catchBotResponse(response));
    }
  };
};

export default connect(null, mapDispatchToProps)(CourseChatContainer);
