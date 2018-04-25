import React from 'react';
import { ChatFeed } from 'react-chat-ui';
import List from 'material-ui/List';
import Input from 'material-ui/Input';
import axios from 'axios';
import { connect } from 'react-redux';

import { catchBotResponse } from '../../modules/actions';

class CourseChat extends React.Component {
  constructor() {
    super();
    this.state = {
      element: '',
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
                message: `${res.data.chatbotResponse} - it has an id of ${
                  res.data.exercise.exerciseId
                }`
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

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div style={{ border: '1px solid #dedede' }}>
        <List
          style={{
            maxHeight: '500px',
            overflow: 'auto',
            width: '100%',
            minHeight: '500px',
            background: '#f7f7f7'
          }}>
          <ChatFeed
            messages={this.state.messages}
            isTyping={this.state.is_typing}
            showSenderName
            bubblesCentered={false}
            bubbleStyles={{
              text: {
                fontSize: 30
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40,
                backgroundColor: '#F70044'
              }
            }}
          />
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </List>
        <Input
          placeholder="Your message"
          style={{
            height: '40px',
            lineHeight: '40px',
            width: '100%',
            background: '#fffdfd',
            borderTop: '1px solid #dedede',
            padding: '10px'
          }}
          disableUnderline
          onKeyDown={this.keyPress}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
      </div>
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

export default connect(null, mapDispatchToProps)(CourseChat);
