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
        <List
          style={{
            maxHeight: '500px',
            overflow: 'auto',
            width: '100%',
            minHeight: '500px',
            background: '#f7f7f7'
          }}>
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
