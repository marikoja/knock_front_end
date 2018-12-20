import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import '../css/reply.css'
import axios from 'axios'
import {apiUrl} from '../config.js'

class Reply extends Component {

  constructor(props) {
      super(props);
      this.state = { html: '' }; // You can also pass a Quill Delta here
  }

  handleChange = (value, delta, source, editor) => {

    this.setState({ html: editor.getHTML() });
  }

  send = () => {

    axios.post(apiUrl + '/conversation/' + this.props.conversationId + '/message', {
      text: this.state.html,
      user_id: this.props.userId
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        this.setState({html:''});
        // Notify conversation component that a new reply has been made
        this.props.messageSent();
      })
      .catch((error) => {
      console.log(error.message);
      this.setState({
        message: 'Login failed',
      })
    })
  }



  render() {
    return (
      <div className='replyBox'>
        <ReactQuill value={this.state.html}
                  onChange={this.handleChange} />
                <button onClick={this.send} className='sendBtn'>SEND</button>

      </div>
    )
  }
}

export default Reply;
