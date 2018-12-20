import React, {Component} from 'react';
import Message from './Message';
import Reply from './Reply'
import '../css/users.css'
import axios from 'axios'

class Conversation extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount = () => {
    const url = 'http://204.11.60.79:5000/conversation/' + 12;

    axios.get(url)
      .then( (response) => {
        console.log(response.data.messages[0]);
        this.setState({ messages: response.data.messages });
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
        </div>
        <Reply/>
      </div>
    )
  }
}

export default Conversation;
