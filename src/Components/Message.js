import React, {Component} from 'react';
import Timestamp from './Timestamp';
import propTypes from 'prop-types';
import '../css/message.css'

class Message extends Component {

  render() {
    // Set styling based on message sender
    let cssClass = 'chat-entry ';
    cssClass += this.props.userId === this.props.senderId ? 'local' : 'remote'
    return(
      <article className={cssClass} >
        <h4 className='entry-name'>{this.props.senderName}</h4>
        <section className='entry-bubble'>
          <p className='entry-body' dangerouslySetInnerHTML={{__html: this.props.body}}/>
          <p className='entry-time'><Timestamp time={this.props.timestamp}/></p>
        </section>
      </article>
    );
  }
}

Message.propTypes = {
  senderName: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  timestamp: propTypes.string.isRequired,
  isPresent: propTypes.bool
}

export default Message;
