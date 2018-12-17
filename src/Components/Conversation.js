import React, {Component} from 'react';
import Message from './Message';
import Reply from './Reply'

class Conversation extends Component {
  render() {


    return (
      <article className='conversation-entry'>
        <p>conversation with _______</p>
        <p>conversation 1 ...</p>
        <p>conversation 2...</p>
        <p>conversation 3...</p>

        <Reply/>
      </article>
    )
  }
}

export default Conversation;
