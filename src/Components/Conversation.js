import React, {Component} from 'react';
import Message from './Message';
import Reply from './Reply'
import '../css/users.css'
import axios from 'axios'
import {apiUrl} from '../config.js'

class Conversation extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }

  /* scroll to the bottom of the page whenever
  we receive a new message */
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  // When we load the page we want to scorll to the bottom of the message list
  componentDidMount() {
    this.scrollToBottom();

    // set a timer to check for new messages every 5 seconds
    this.checkMessages = setInterval(() => {
      this.fetchNewMessages();
    }, 5000)
  }

  // stop polling for new messages when we're no longer viewing this component
  componentWillUnmount() {
    clearInterval(this.checkMessages);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  /* Get new messages after we send a message to render our latest messsage in
  the conversation */
  messageSent = () => {
    this.fetchNewMessages();
  }

  fetchNewMessages = () => {
    let afterMessage = '';
    if (this.state.messages.length > 0) {
      afterMessage = '?after=' + this.state.messages[this.state.messages.length - 1].message_id;
    }

    axios.get(apiUrl + '/conversation/' + this.props.conversationId + afterMessage)
      .then( (response) => {

        /* As a safeguard, remove any messages that are already
        on this.state.messages -- prevent the display of duplicates */
        for (let a = 0; a < response.data.messages.length; a++) {
          for (let b = 0; b < this.state.messages.length; b++) {
            if (response.data.messages[a].message_id === this.state.messages[b].message_id) {
              // remove the messages that are already logged on our this.state.messages
              response.data.messages.splice(a,1);
              break;
            }
          }
        }

        this.setState({ messages: this.state.messages.concat(...response.data.messages) });
    })
      .catch( (error) => {
        console.error(error);
        this.setState({ error: error.message });
    });
  }

  render() {

    const messageComponents = this.state.messages.map((message) => {
      return (
        <Message
        key={message.message_id}
        senderName={message.user_name}
        senderId={message.user_id}
        body={message.text}
        timestamp={message.sent_dt_tm}
        userId={this.props.userId}
        />
      );
    });

    return (
      <div>
        <div className='conversationList'>
          {messageComponents}
          <div
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <Reply userId={this.props.userId} conversationId={this.props.conversationId} messageSent={this.messageSent}/>
      </div>
    )
  }
}

export default Conversation;
