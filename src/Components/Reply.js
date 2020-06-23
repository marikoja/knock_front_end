import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import '../css/reply.css'
import axios from 'axios'
import {apiUrl} from '../config.js'

class Reply extends Component {

  constructor(props) {
      super(props);
      this.state = {
        html: '',
        sendingReply:false };
  }

  // We want to send the HTML from the WYSIWYG editor in the email
  handleChange = (value, delta, source, editor) => {
    this.setState({ html: editor.getHTML() });
  }

  /* When the user sends the message we want to add it to the
  current conversation and clear the editor */
  send = () => {
    if (this.state.html !== '') {
      this.setState({
        sendingReply:true
      });
      axios.post(apiUrl + '/conversation/' + this.props.conversationId + '/message', {
        text: this.state.html,
        user_id: this.props.userId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          this.setState({
            html:'',
            sendingReply:false});
          // Notify conversation component that a new reply has been made
          this.props.messageSent();
        })
        .catch((error) => {
        console.error(error);
        this.setState({sendingReply:false});
      })
    }
  }

  render() {
    return (
      <div className='replyBox'>
        <ReactQuill value={this.state.html}
                  onChange={this.handleChange} />
                <button onClick={this.send}
                 disabled={this.state.sendingReply}
                 className='sendBtn'>SEND</button>
      </div>
    )
  }
}

export default Reply;
