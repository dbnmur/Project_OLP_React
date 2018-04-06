import React from 'react';
import { ChatFeed } from 'react-chat-ui';
import List from 'material-ui/List';
import Input from 'material-ui/Input';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      element: '',
      messages: [
        {
          id: 1,
          message: 'Hey, what are you up to?'
        }
      ]
    };

    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      console.log('value', e.target.value);

      let newMessage = {
        id: 0,
        message: e.target.value
      };
      this.setState(prevState => ({
        messages: this.state.messages.concat([newMessage])
      }));
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
      <div>
        <List
          style={{
            maxHeight: '360px',
            overflow: 'auto',
            width: '100%',
            height: '500px'
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
                padding: 40
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
          style={{ height: '40px', lineHeight: '40px', width: '100%' }}
          onKeyDown={this.keyPress}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
      </div>
    );
  }
}

export default Chat;
