import React, {Component} from 'react';
import Message from './Message';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

class Reply extends Component {

  constructor(props) {
      super(props);
      this.state = { text: '' }; // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
      this.setState({ text: value });
    }

    send() {
      console.log(this.state.text);
    }

  render() {
    return (
      <article>

      <ReactQuill value={this.state.text}
                  onChange={this.handleChange} />
        <button onClick={this.send.bind(this)}>SEND</button>
      </article>
    )
  }
}

export default Reply;
