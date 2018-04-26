import React from 'react';
import { ChatFeed } from 'react-chat-ui';
import List from 'material-ui/List';
import Input from 'material-ui/Input';

class CourseChat extends React.Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div style={{ border: '1px solid #dedede' }}>
        <List className="chatFeed">
          <ChatFeed
            messages={this.props.messages}
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
            className="scrollToDiv"
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </List>
        <Input
          placeholder="Your message"
          className="messageInput"
          disableUnderline
          onKeyDown={this.props.keyPress}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
      </div>
    );
  }
}

export default CourseChat;
