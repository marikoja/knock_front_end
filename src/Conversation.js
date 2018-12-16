import React, {Component} from 'react';
import Message from './Message';

class Conversation extends Component {
  render() {
    const messages = this.props.messages

    const messageComponents = messages.map((message) => {
      return (
        <Message
        key={message.sender}
        sender={message.sender}
        body={message.body}
        timestamp={message.timeStamp}
        />
      );
    });

    return (
      <article className='conversation-entry'>
        {messageComponents}
      </article>
    )
  }
}

export default Conversation;
