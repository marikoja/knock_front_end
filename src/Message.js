import React, {Component} from 'react';
import Timestamp from './Timestamp';
import propTypes from 'prop-types';

class Message extends Component {
  render() {
    const senderName = this.props.sender;
    const body = this.props.body;
    const timestamp = this.props.timestamp;
    let theCSSClass = 'conversation-entry ';
    theCSSClass += senderName === 'Estragon' ? 'remote' : 'local'
    return(
      <article className={theCSSClass} >
        <h3 className='entry-name'>{senderName}</h3>
        <section className='entry-bubble'>
          <p className='entry-body'>{body}</p>
          <p className='entry-time'><Timestamp time={timestamp}/></p>
        </section>
      </article>
    );
  }
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  timestamp: propTypes.string.isRequired,
  isPresent: propTypes.bool
}

export default Message;
